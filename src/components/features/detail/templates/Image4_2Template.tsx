'use client';

import { Group, Rect, Text } from 'react-konva';
import {
  CANVAS_BG_FILL,
  IMAGE_SLOT_FILL,
  IMAGE_SLOT_PLACEHOLDER,
  SLOT_STROKE,
  SLOT_TEXT_FILL,
} from '@/components/features/detail/templates/templateConstants';

interface Image4_2TemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 601;

const SLOTS = [
  {
    id: 'slot-1',
    x: 0,
    y: 0,
    width: 430,
    height: 290.5,
    type: 'image' as const,
  },
  {
    id: 'slot-2',
    x: 450,
    y: 0,
    width: 430,
    height: 290.5,
    type: 'image' as const,
  },
  {
    id: 'slot-3',
    x: 0,
    y: 310.5,
    width: 430,
    height: 290.5,
    type: 'image' as const,
  },
  {
    id: 'slot-4',
    x: 450,
    y: 310.5,
    width: 430,
    height: 290.5,
    type: 'image' as const,
  },
];

export const Image4_2Template = ({ templateId }: Image4_2TemplateProps) => {
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
