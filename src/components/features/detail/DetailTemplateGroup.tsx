'use client';

import { Group, Rect, Text } from 'react-konva';
import { DETAIL_TEMPLATE_HEIGHTS } from '@/constants/detail-template';
import type { DetailTemplateType } from '@/types/template';

interface DetailTemplateGroupProps {
  type: DetailTemplateType;
  x: number;
  y: number;
  width: number;
}

const PLACEHOLDER_FILL = '#e6e8ea';
// --color-border-subtle 토큰값 (Konva는 CSS 변수를 지원하지 않아 직접 지정)
const PLACEHOLDER_STROKE = '#cdd1d5';

// TODO: 템플릿 패널의 미리보기(TemplateThumbnailCard)와 별개로,
// 캔버스에 실제 배치되는 템플릿 모양은 타입별로 추후 구현 예정
export const DetailTemplateGroup = ({
  type,
  x,
  y,
  width,
}: DetailTemplateGroupProps) => {
  const height = DETAIL_TEMPLATE_HEIGHTS[type];

  return (
    <Group x={x} y={y} draggable>
      <Rect
        width={width}
        height={height}
        fill={PLACEHOLDER_FILL}
        stroke={PLACEHOLDER_STROKE}
        strokeWidth={1}
      />
      <Text
        width={width}
        height={height}
        text={type}
        align="center"
        verticalAlign="middle"
        fontSize={14}
        fill="#464c53"
      />
    </Group>
  );
};
