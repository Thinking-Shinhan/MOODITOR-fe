'use client';

import { Group, Rect, Text } from 'react-konva';
import {
  CANVAS_BG_FILL,
  IMAGE_SLOT_FILL,
  IMAGE_SLOT_PLACEHOLDER,
  SLOT_STROKE,
  SLOT_TEXT_FILL,
} from '@/components/features/detail/templates/templateConstants';

interface Image1_1TemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 1180;

const SLOTS = [
  {
    id: 'slot-1',
    x: 0,
    y: 0,
    width: 879,
    height: 1180,
    type: 'image' as const,
  },
];

export const Image1_1Template = ({ templateId }: Image1_1TemplateProps) => {
  return (
    <Group>
      <Rect
        width={TEMPLATE_WIDTH}
        height={TEMPLATE_HEIGHT}
        fill={CANVAS_BG_FILL}
      />
      {SLOTS.map((slot) => (
        <Group key={slot.id} x={slot.x} y={slot.y}>
          <Rect
            name={`slot-${templateId}-${slot.id}`}
            width={slot.width}
            height={slot.height}
            fill={IMAGE_SLOT_FILL}
            stroke={SLOT_STROKE}
            strokeWidth={1}
          />
          <Text
            width={slot.width}
            height={slot.height}
            text={IMAGE_SLOT_PLACEHOLDER}
            align="center"
            verticalAlign="middle"
            fontSize={14}
            fill={SLOT_TEXT_FILL}
            listening={false}
          />
        </Group>
      ))}
    </Group>
  );
};
