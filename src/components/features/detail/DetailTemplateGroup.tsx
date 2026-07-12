'use client';

import { Group, Rect, Text } from 'react-konva';
import type { DetailTemplateType } from '@/types/template';

interface DetailTemplateGroupProps {
  type: DetailTemplateType;
  x: number;
  y: number;
}

const PLACEHOLDER_FILL = '#e6e8ea';
const PLACEHOLDER_WIDTH = 360;
const PLACEHOLDER_HEIGHT = 240;

// TODO: 템플릿 패널의 미리보기(TemplateThumbnailCard)와 별개로,
// 캔버스에 실제 배치되는 템플릿 모양은 타입별로 추후 구현 예정
export const DetailTemplateGroup = ({
  type,
  x,
  y,
}: DetailTemplateGroupProps) => {
  return (
    <Group x={x} y={y} draggable>
      <Rect
        width={PLACEHOLDER_WIDTH}
        height={PLACEHOLDER_HEIGHT}
        fill={PLACEHOLDER_FILL}
      />
      <Text
        width={PLACEHOLDER_WIDTH}
        height={PLACEHOLDER_HEIGHT}
        text={type}
        align="center"
        verticalAlign="middle"
        fontSize={14}
        fill="#464c53"
      />
    </Group>
  );
};
