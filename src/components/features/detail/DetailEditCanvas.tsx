'use client';

import { DragEvent, Fragment, useState } from 'react';
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
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { DetailTemplateBlock } from '@/components/features/detail/DetailTemplateBlock';
import { DetailTemplateBlockContent } from '@/components/features/detail/DetailTemplateBlockContent';
import { Body } from '@/components/commons/Typography';
import { Toast } from '@/components/commons/Toast';
import { useDetailCanvasStore } from '@/stores/detailCanvasStore';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import { useDetailCanvasZoomStore } from '@/stores/detailCanvasZoomStore';
import type { DetailTemplate } from '@/types/template';
import { SquareMousePointer } from 'lucide-react';

const NO_PRODUCT_SELECTED_MESSAGE =
  '상세페이지 제작 시 활용할 상품을 먼저 선택해주세요.';

const noop = () => {};

const DropIndicatorLine = () => (
  <div className="bg-btn-primary-fill h-[3px] w-full shrink-0 rounded-[var(--radius-max)]" />
);

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
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(
    null,
  );
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const zoom = useDetailCanvasZoomStore((state) => state.zoom);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const getInsertIndexFromEvent = (event: DragEvent<HTMLDivElement>) => {
    const blockEls =
      event.currentTarget.querySelectorAll<HTMLElement>('[data-template-id]');
    for (let i = 0; i < blockEls.length; i++) {
      const rect = blockEls[i].getBoundingClientRect();
      if (event.clientY < rect.top + rect.height / 2) {
        return i;
      }
    }
    return placedTemplates.length;
  };

  const isTemplateDrag = (event: DragEvent<HTMLDivElement>) =>
    Array.from(event.dataTransfer.types).includes('application/json');

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    if (placedTemplates.length > 0 && isTemplateDrag(event)) {
      setDropIndicatorIndex(getInsertIndexFromEvent(event));
    } else {
      setDropIndicatorIndex(null);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDropIndicatorIndex(null);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDropIndicatorIndex(null);

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

    addTemplate(template.type, getInsertIndexFromEvent(event));
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
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={
          placedTemplates.length === 0
            ? 'flex w-full flex-1 items-center justify-center'
            : 'flex w-full flex-col items-center pb-[300px]'
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
            modifiers={[restrictToVerticalAxis]}
            onDragStart={handleDragStart}
            onDragEnd={handleReorder}
          >
            <SortableContext
              items={placedTemplates.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center',
                }}
              >
                <div className="flex flex-col gap-[var(--gap-7)]">
                  {dropIndicatorIndex === 0 && <DropIndicatorLine />}
                  {placedTemplates.map((placed, index) => (
                    <Fragment key={placed.id}>
                      <DetailTemplateBlock
                        id={placed.id}
                        type={placed.type}
                        pageNumber={index + 1}
                        onMoveUp={() => handleMoveUp(index)}
                        onMoveDown={() => handleMoveDown(index)}
                        moveUpDisabled={index === 0}
                        moveDownDisabled={index === placedTemplates.length - 1}
                        onDelete={() => handleDelete(placed.id)}
                      />
                      {dropIndicatorIndex === index + 1 && (
                        <DropIndicatorLine />
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </SortableContext>
            <DragOverlay>
              {activeTemplate && (
                <div
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top left',
                  }}
                >
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
                </div>
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
