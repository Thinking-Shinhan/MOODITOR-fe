'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DetailTemplateBlockContent } from '@/components/features/detail/DetailTemplateBlockContent';
import type { DetailTemplateType } from '@/types/template';

interface DetailTemplateBlockProps {
  id: string;
  type: DetailTemplateType;
  pageNumber: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  moveUpDisabled: boolean;
  moveDownDisabled: boolean;
  onDelete: () => void;
}

export const DetailTemplateBlock = ({
  id,
  type,
  pageNumber,
  onMoveUp,
  onMoveDown,
  moveUpDisabled,
  moveDownDisabled,
  onDelete,
}: DetailTemplateBlockProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <DetailTemplateBlockContent
        id={id}
        type={type}
        pageNumber={pageNumber}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        moveUpDisabled={moveUpDisabled}
        moveDownDisabled={moveDownDisabled}
        onDelete={onDelete}
      />
    </div>
  );
};
