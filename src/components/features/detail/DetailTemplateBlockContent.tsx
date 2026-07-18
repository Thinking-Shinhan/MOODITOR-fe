'use client';

import { useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import type Konva from 'konva';
import { DetailTemplateGroup } from '@/components/features/detail/DetailTemplateGroup';
import { DetailTemplateHeader } from '@/components/features/detail/DetailTemplateHeader';
import {
  registerStageRef,
  unregisterStageRef,
} from '@/components/features/detail/stageRefRegistry';
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
import {
  TEMPLATE_HEIGHT as SIZE_INFO_HEIGHT,
  buildSizeTableFromProduct,
  getSizeInfoTemplateHeight,
} from '@/components/features/detail/templates/SizeInfoTemplate';
import { useDetailPageInit } from '@/hooks/useDetailPageInit';
import { useCopyReviewStore } from '@/stores/copyReviewStore';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import { getTemplateBlockDomId } from '@/utils/templateBlockDom';
import type { DetailTemplateType } from '@/types/template';

interface DetailTemplateBlockContentProps {
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

export const TEMPLATE_HEIGHTS: Record<DetailTemplateType, number> = {
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

export const DetailTemplateBlockContent = ({
  id,
  type,
  pageNumber,
  onMoveUp,
  onMoveDown,
  moveUpDisabled,
  moveDownDisabled,
  onDelete,
}: DetailTemplateBlockContentProps) => {
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const { data } = useDetailPageInit(
    selectedProduct ? Number(selectedProduct.id) : null,
  );
  const height =
    type === 'SIZE_INFO' && data
      ? getSizeInfoTemplateHeight(buildSizeTableFromProduct(data.product))
      : TEMPLATE_HEIGHTS[type];
  const stageRef = useRef<Konva.Stage>(null);
  const isFocused = useCopyReviewStore(
    (state) => state.focusedInstanceKey === id,
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    registerStageRef(id, stage);
    return () => unregisterStageRef(id, stage);
  }, [id]);

  return (
    <div className="flex flex-col gap-[var(--gap-2)]">
      <DetailTemplateHeader
        templateId={id}
        templateType={type}
        pageNumber={pageNumber}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        moveUpDisabled={moveUpDisabled}
        moveDownDisabled={moveDownDisabled}
        onDelete={onDelete}
      />
      <div
        id={getTemplateBlockDomId(id)}
        className={
          isFocused
            ? 'outline-border-primary shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] outline-[1.5px]'
            : ''
        }
      >
        <Stage ref={stageRef} width={CANVAS_WIDTH} height={height}>
          <Layer>
            <DetailTemplateGroup templateId={id} type={type} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
