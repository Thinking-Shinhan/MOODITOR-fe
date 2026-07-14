'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Stage, Layer } from 'react-konva';
import { DetailTemplateGroup } from '@/components/features/detail/DetailTemplateGroup';
import { DetailTemplateHeader } from '@/components/features/detail/DetailTemplateHeader';
import { TEMPLATE_HEIGHT as IMAGE_1_1_HEIGHT } from '@/components/features/detail/templates/Image1_1Template';
import { TEMPLATE_HEIGHT as IMAGE_1_2_HEIGHT } from '@/components/features/detail/templates/Image1_2Template';
import { TEMPLATE_HEIGHT as IMAGE_2_1_HEIGHT } from '@/components/features/detail/templates/Image2_1Template';
import { TEMPLATE_HEIGHT as IMAGE_2_2_HEIGHT } from '@/components/features/detail/templates/Image2_2Template';
import { TEMPLATE_HEIGHT as IMAGE_3_1_HEIGHT } from '@/components/features/detail/templates/Image3_1Template';
import { TEMPLATE_HEIGHT as IMAGE_3_2_HEIGHT } from '@/components/features/detail/templates/Image3_2Template';
import { TEMPLATE_HEIGHT as IMAGE_4_1_HEIGHT } from '@/components/features/detail/templates/Image4_1Template';
import { TEMPLATE_HEIGHT as IMAGE_4_2_HEIGHT } from '@/components/features/detail/templates/Image4_2Template';
import { TEMPLATE_HEIGHT as TEXT_1_HEIGHT } from '@/components/features/detail/templates/Text1Template';
import { TEMPLATE_HEIGHT as TEXT_2_HEIGHT } from '@/components/features/detail/templates/Text2Template';
import { TEMPLATE_HEIGHT as TEXT_3_HEIGHT } from '@/components/features/detail/templates/Text3Template';
import { TEMPLATE_HEIGHT as TEXT_4_HEIGHT } from '@/components/features/detail/templates/Text4Template';
import { TEMPLATE_HEIGHT as TEXT_5_HEIGHT } from '@/components/features/detail/templates/Text5Template';
import { TEMPLATE_HEIGHT as MATERIAL_HEIGHT } from '@/components/features/detail/templates/MaterialTemplate';
import { TEMPLATE_HEIGHT as SIZE_TIP_HEIGHT } from '@/components/features/detail/templates/SizeTipTemplate';
import { TEMPLATE_HEIGHT as SIZE_INFO_HEIGHT } from '@/components/features/detail/templates/SizeInfoTemplate';
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

const CANVAS_WIDTH = 879;

const TEMPLATE_HEIGHTS: Record<DetailTemplateType, number> = {
  IMAGE_1_1: IMAGE_1_1_HEIGHT,
  IMAGE_1_2: IMAGE_1_2_HEIGHT,
  IMAGE_2_1: IMAGE_2_1_HEIGHT,
  IMAGE_2_2: IMAGE_2_2_HEIGHT,
  IMAGE_3_1: IMAGE_3_1_HEIGHT,
  IMAGE_3_2: IMAGE_3_2_HEIGHT,
  IMAGE_4_1: IMAGE_4_1_HEIGHT,
  IMAGE_4_2: IMAGE_4_2_HEIGHT,
  TEXT_1: TEXT_1_HEIGHT,
  TEXT_2: TEXT_2_HEIGHT,
  TEXT_3: TEXT_3_HEIGHT,
  TEXT_4: TEXT_4_HEIGHT,
  TEXT_5: TEXT_5_HEIGHT,
  MATERIAL: MATERIAL_HEIGHT,
  SIZE_TIP: SIZE_TIP_HEIGHT,
  SIZE_INFO: SIZE_INFO_HEIGHT,
};

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
  const height = TEMPLATE_HEIGHTS[type];

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
      className="flex cursor-grab flex-col gap-[var(--gap-2)] active:cursor-grabbing"
    >
      <DetailTemplateHeader
        pageNumber={pageNumber}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        moveUpDisabled={moveUpDisabled}
        moveDownDisabled={moveDownDisabled}
        onDelete={onDelete}
      />
      <Stage width={CANVAS_WIDTH} height={height}>
        <Layer>
          <DetailTemplateGroup templateId={id} type={type} />
        </Layer>
      </Stage>
    </div>
  );
};
