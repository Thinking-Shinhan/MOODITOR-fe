'use client';

import { useRef } from 'react';
import { Group, Rect } from 'react-konva';
import type Konva from 'konva';
import { ImageSlot } from '@/components/features/detail/templates/ImageSlot';
import { useImageSlotDrop } from '@/components/features/detail/templates/useImageSlotDrop';
import { CANVAS_BG_FILL } from '@/components/features/detail/templates/templateConstants';

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
  const rootRef = useRef<Konva.Group>(null);
  const images = useImageSlotDrop(rootRef, templateId, SLOTS);

  return (
    <Group ref={rootRef}>
      <Rect
        width={TEMPLATE_WIDTH}
        height={TEMPLATE_HEIGHT}
        fill={CANVAS_BG_FILL}
      />
      {SLOTS.map((slot) => (
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
      ))}
    </Group>
  );
};
