'use client';

import { useRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import type Konva from 'konva';
import { ImageSlot } from '@/components/features/detail/templates/ImageSlot';
import { useImageSlotDrop } from '@/components/features/detail/templates/useImageSlotDrop';
import {
  CANVAS_BG_FILL,
  SLOT_TEXT_FILL,
  TEXT_SLOT_FILL,
  TEXT_SLOT_PLACEHOLDER,
} from '@/components/features/detail/templates/templateConstants';

interface SizeInfoTemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 1204.2083740234375;

const SLOTS = [
  {
    id: 'slot-1',
    x: 80,
    y: 80,
    width: 719,
    height: 124.2083740234375,
    type: 'text' as const,
  },
  {
    id: 'slot-2',
    x: 239.5,
    y: 204.2083740234375,
    width: 400,
    height: 400,
    type: 'image' as const,
  },
  {
    id: 'slot-3',
    x: 80,
    y: 604.2083740234375,
    width: 719,
    height: 520,
    type: 'text' as const,
  },
];

export const SizeInfoTemplate = ({ templateId }: SizeInfoTemplateProps) => {
  const rootRef = useRef<Konva.Group>(null);
  const images = useImageSlotDrop(rootRef, templateId, SLOTS);

  return (
    <Group ref={rootRef}>
      <Rect
        width={TEMPLATE_WIDTH}
        height={TEMPLATE_HEIGHT}
        fill={CANVAS_BG_FILL}
      />
      {SLOTS.map((slot) =>
        slot.type === 'image' ? (
          <ImageSlot
            key={slot.id}
            templateId={templateId}
            id={slot.id}
            x={slot.x}
            y={slot.y}
            width={slot.width}
            height={slot.height}
            imageSrc={images[slot.id] ?? null}
          />
        ) : (
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
        ),
      )}
    </Group>
  );
};
