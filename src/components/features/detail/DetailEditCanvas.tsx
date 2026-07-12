'use client';

import { DragEvent, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { DetailTemplateGroup } from '@/components/features/detail/DetailTemplateGroup';
import { DETAIL_TEMPLATE_HEIGHTS } from '@/constants/detail-template';
import type { DetailTemplate, DetailTemplateType } from '@/types/template';

const CANVAS_WIDTH = 879;
const CANVAS_MIN_HEIGHT = 1180;

interface PlacedTemplate {
  id: string;
  type: DetailTemplateType;
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

    // 드롭 위치와 무관하게 항상 맨 아래에 순서대로 쌓는다
    setPlacedTemplates((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type: template.type },
    ]);
  };

  const positionedTemplates = placedTemplates.reduce<
    Array<PlacedTemplate & { y: number }>
  >((acc, placed) => {
    const previousBottom = acc.length > 0 ? acc[acc.length - 1].y : 0;
    const previousHeight =
      acc.length > 0 ? DETAIL_TEMPLATE_HEIGHTS[acc[acc.length - 1].type] : 0;
    return [...acc, { ...placed, y: previousBottom + previousHeight }];
  }, []);
  const totalHeight = positionedTemplates.reduce(
    (sum, placed) => sum + DETAIL_TEMPLATE_HEIGHTS[placed.type],
    0,
  );
  const stageHeight = Math.max(totalHeight, CANVAS_MIN_HEIGHT);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="inline-block"
    >
      <Stage width={CANVAS_WIDTH} height={stageHeight}>
        <Layer>
          {positionedTemplates.map((placed) => (
            <DetailTemplateGroup
              key={placed.id}
              type={placed.type}
              x={0}
              y={placed.y}
              width={CANVAS_WIDTH}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
