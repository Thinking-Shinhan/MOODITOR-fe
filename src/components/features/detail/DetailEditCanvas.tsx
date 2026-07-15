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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DetailTemplateBlock } from '@/components/features/detail/DetailTemplateBlock';
import { DetailTemplateBlockContent } from '@/components/features/detail/DetailTemplateBlockContent';
import { Body } from '@/components/commons/Typography';
import { Toast } from '@/components/commons/Toast';
import { useDetailCanvasStore } from '@/stores/detailCanvasStore';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import type { DetailTemplate } from '@/types/template';
import { SquareMousePointer } from 'lucide-react';

const NO_PRODUCT_SELECTED_MESSAGE =
  '상세페이지 제작 시 활용할 상품을 먼저 선택해주세요.';

const noop = () => {};

export const DetailEditCanvas = () => {
  const placedTemplates = useDetailCanvasStore(
    (state) => state.placedTemplates,
  );
  const addTemplate = useDetailCanvasStore((state) => state.addTemplate);
  const reorderTemplates = useDetailCanvasStore(
    (state) => state.reorderTemplates,
  );
  const moveTemplateUp = useDetailCanvasStore((state) => state.moveTemplateUp);
  const moveTemplateDown = useDetailCanvasStore(
    (state) => state.moveTemplateDown,
  );
  const deleteTemplate = useDetailCanvasStore((state) => state.deleteTemplate);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [noProductToastOpen, setNoProductToastOpen] = useState(false);
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );

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

    if (!selectedProduct) {
      setNoProductToastOpen(true);
      return;
    }

    // 드롭 위치와 무관하게 항상 맨 아래에 순서대로 쌓는다
    // TODO: 드롭 위치에 따라 순서를 조정하는 기능 추가
    addTemplate(template.type);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleReorder = (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    reorderTemplates(String(active.id), String(over.id));
  };

  const handleMoveUp = (index: number) => {
    moveTemplateUp(index);
  };

  const handleMoveDown = (index: number) => {
    moveTemplateDown(index);
  };

  const handleDelete = (id: string) => {
    deleteTemplate(id);
  };

  const activeIndex = placedTemplates.findIndex((item) => item.id === activeId);
  const activeTemplate = activeIndex >= 0 ? placedTemplates[activeIndex] : null;

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={
          placedTemplates.length === 0
            ? 'flex w-full flex-1 items-center justify-center'
            : 'inline-flex'
        }
      >
        {placedTemplates.length === 0 ? (
          <div className="bg-bg-gray-subtler flex size-full flex-col items-center justify-center gap-[var(--size-height-4)]">
            <SquareMousePointer size={32} className="text-icon-disabled-on" />
            <div className="flex flex-col items-center gap-[var(--gap-2)]">
              <Body
                size="medium"
                bold
                className="text-text-disabled-on text-center"
              >
                상세페이지를 제작하고 싶은 상품을 선택한 후,
                <br />
                원하는 템플릿을 이곳으로 드래그해 주세요.
              </Body>
              <Body size="xsmall" className="text-text-disabled-on text-center">
                이미지와 텍스트를 자유롭게 구성해
                <br />
                우리 브랜드만의 상세페이지를 완성해 보세요.
              </Body>
            </div>
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
      <Toast
        usePortal={false}
        open={noProductToastOpen}
        state="error"
        message={NO_PRODUCT_SELECTED_MESSAGE}
        onClose={() => setNoProductToastOpen(false)}
      />
    </>
  );
};
