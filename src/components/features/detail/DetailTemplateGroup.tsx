'use client';

import { Group, Rect, Text } from 'react-konva';
import type { DetailTemplateType } from '@/types/template';

interface DetailTemplateGroupProps {
  type: DetailTemplateType;
  x: number;
  y: number;
}

const PLACEHOLDER_FILL = '#e6e8ea';
const GAP = 16;
const COL_WIDTH = 180;

export const DetailTemplateGroup = ({
  type,
  x,
  y,
}: DetailTemplateGroupProps) => {
  return (
    <Group x={x} y={y} draggable>
      {type === 'IMAGE_2COL' && (
        <>
          <Rect width={COL_WIDTH} height={240} fill={PLACEHOLDER_FILL} />
          <Rect
            x={COL_WIDTH + GAP}
            width={COL_WIDTH}
            height={240}
            fill={PLACEHOLDER_FILL}
          />
        </>
      )}

      {type === 'IMAGE_3COL' && (
        <>
          <Rect width={COL_WIDTH} height={160} fill={PLACEHOLDER_FILL} />
          <Rect
            x={COL_WIDTH + GAP}
            width={COL_WIDTH}
            height={160}
            fill={PLACEHOLDER_FILL}
          />
          <Rect
            y={160 + GAP}
            width={COL_WIDTH * 2 + GAP}
            height={120}
            fill={PLACEHOLDER_FILL}
          />
        </>
      )}

      {type === 'TEXT_1COL' && (
        <>
          <Text
            width={360}
            text={'"Structured Pleat Signature Fit"'}
            fontSize={14}
            fontStyle="bold"
            fill="#1e2124"
          />
          <Text
            y={28}
            width={360}
            text={'움직임을 따라 정돈되는\n테일러드 플리츠 핏'}
            fontSize={22}
            fontStyle="bold"
            lineHeight={1.4}
            fill="#1e2124"
          />
          <Text
            y={100}
            width={360}
            text={
              '구조감 있는 플리츠 라인이\n스포티하면서도 정제된 실루엣을 완성합니다.'
            }
            fontSize={13}
            lineHeight={1.5}
            fill="#464c53"
          />
        </>
      )}
    </Group>
  );
};
