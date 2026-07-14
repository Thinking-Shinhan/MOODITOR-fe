'use client';

import { DragEvent, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DetailTemplateBlock } from '@/components/features/detail/DetailTemplateBlock';
import { DetailTemplateBlockContent } from '@/components/features/detail/DetailTemplateBlockContent';
import { Body } from '@/components/commons/Typography';
import type { DetailTemplate, DetailTemplateType } from '@/types/template';

interface PlacedTemplate {
  id: string;
  type: DetailTemplateType;
}

const noop = () => {};

export const DetailEditCanvas = () => {
  const [placedTemplates, setPlacedTemplates] = useState<PlacedTemplate[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleReorder = (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPlacedTemplates((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setPlacedTemplates((prev) => arrayMove(prev, index, index - 1));
  };

  const handleMoveDown = (index: number) => {
    setPlacedTemplates((prev) => {
      if (index === prev.length - 1) return prev;
      return arrayMove(prev, index, index + 1);
    });
  };

  const handleDelete = (id: string) => {
    setPlacedTemplates((prev) => prev.filter((item) => item.id !== id));
  };

  const activeIndex = placedTemplates.findIndex((item) => item.id === activeId);
  const activeTemplate = activeIndex >= 0 ? placedTemplates[activeIndex] : null;

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
          onDragStart={handleDragStart}
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
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  moveUpDisabled={index === 0}
                  moveDownDisabled={index === placedTemplates.length - 1}
                  onDelete={() => handleDelete(placed.id)}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeTemplate && (
              <DetailTemplateBlockContent
                id={activeTemplate.id}
                type={activeTemplate.type}
                pageNumber={activeIndex + 1}
                onMoveUp={noop}
                onMoveDown={noop}
                moveUpDisabled
                moveDownDisabled
                onDelete={noop}
              />
            )}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
};
