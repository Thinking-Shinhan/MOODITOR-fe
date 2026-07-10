'use client';

import { DragEvent, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { DetailTemplateGroup } from '@/components/features/detail/DetailTemplateGroup';
import type { DetailTemplate, DetailTemplateType } from '@/types/template';

const CANVAS_WIDTH = 879;
const CANVAS_HEIGHT = 1180;

interface PlacedTemplate {
  id: string;
  type: DetailTemplateType;
  x: number;
  y: number;
}

export const DetailEditCanvas = () => {
  const [placedTemplates, setPlacedTemplates] = useState<PlacedTemplate[]>([]);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const raw = event.dataTransfer.getData('application/json');
    if (!raw) return;

    let template: DetailTemplate;
    try {
      template = JSON.parse(raw);
    } catch {
      return;
    }

    const containerRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    setPlacedTemplates((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: template.type, x, y },
    ]);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="bg-bg-white border-border-subtler inline-block border"
    >
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer>
          {placedTemplates.map((placed) => (
            <DetailTemplateGroup
              key={placed.id}
              type={placed.type}
              x={placed.x}
              y={placed.y}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
