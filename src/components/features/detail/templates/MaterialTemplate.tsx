'use client';

import { Group, Rect, Text } from 'react-konva';
import {
  CANVAS_BG_FILL,
  SLOT_TEXT_FILL,
  TEXT_SLOT_FILL,
  TEXT_SLOT_PLACEHOLDER,
} from '@/components/features/detail/templates/templateConstants';

interface MaterialTemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 1046;

const SLOTS = [
  {
    id: 'slot-1',
    x: 80,
    y: 80,
    width: 719,
    height: 886,
    type: 'text' as const,
  },
];

export const MaterialTemplate = ({ templateId }: MaterialTemplateProps) => {
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
            fill={TEXT_SLOT_FILL}
          />
          <Text
            width={slot.width}
            height={slot.height}
            text={TEXT_SLOT_PLACEHOLDER}
            align="center"
            verticalAlign="middle"
            wrap="char"
            fontSize={14}
            fill={SLOT_TEXT_FILL}
            listening={false}
          />
        </Group>
      ))}
    </Group>
  );
};
