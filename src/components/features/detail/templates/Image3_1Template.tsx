'use client';

import { useRef } from 'react';
import { Group, Rect } from 'react-konva';
import type Konva from 'konva';
import { ImageSlot } from '@/components/features/detail/templates/ImageSlot';
import { useImageSlotDrop } from '@/components/features/detail/templates/useImageSlotDrop';
import { CANVAS_BG_FILL } from '@/components/features/detail/templates/templateConstants';

interface Image3_1TemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 1181;

const SLOTS = [
  { id: 'slot-1', x: 0, y: 0, width: 430, height: 581, type: 'image' as const },
  {
    id: 'slot-2',
    x: 450,
    y: 0,
    width: 430,
    height: 581,
    type: 'image' as const,
  },
  {
    id: 'slot-3',
    x: 0,
    y: 601,
    width: 879,
    height: 580.5,
    type: 'image' as const,
  },
];

export const Image3_1Template = ({ templateId }: Image3_1TemplateProps) => {
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
          imageSrc={images[slot.id]?.url ?? null}
        />
      ))}
    </Group>
  );
};
