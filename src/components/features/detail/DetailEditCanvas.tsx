'use client';

import { DragEvent, useState } from 'react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DetailTemplateBlock } from '@/components/features/detail/DetailTemplateBlock';
import { Body } from '@/components/commons/Typography';
import type { DetailTemplate, DetailTemplateType } from '@/types/template';

interface PlacedTemplate {
  id: string;
  type: DetailTemplateType;
}

export const DetailEditCanvas = () => {
  const [placedTemplates, setPlacedTemplates] = useState<PlacedTemplate[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const raw = event.dataTransfer.getData('application/json');
    if (!raw) return;

    let template: DetailTemplate;
    try {
      template = JSON.parse(raw);
    } catch {
      return;
    }

    // 드롭 위치와 무관하게 항상 맨 아래에 순서대로 쌓는다
    // TODO: 드롭 위치에 따라 순서를 조정하는 기능 추가
    setPlacedTemplates((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: template.type },
    ]);
  };

  const handleReorder = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPlacedTemplates((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="inline-flex"
    >
      {placedTemplates.length === 0 ? (
        <div className="border-border-subtler flex h-[400px] w-[879px] items-center justify-center rounded-[var(--radius-large1)] border border-dashed">
          <Body size="medium" className="text-text-subtler">
            여기에 템플릿을 드래그해서 배치하세요
          </Body>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleReorder}
        >
          <SortableContext
            items={placedTemplates.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-[var(--gap-7)]">
              {placedTemplates.map((placed, index) => (
                <DetailTemplateBlock
                  key={placed.id}
                  id={placed.id}
                  type={placed.type}
                  pageNumber={index + 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
