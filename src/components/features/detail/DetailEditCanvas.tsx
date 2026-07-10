'use client';

import { Stage, Layer } from 'react-konva';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

export const DetailEditCanvas = () => {
  return (
    <div className="bg-bg-white border-border-subtler inline-block border">
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer />
      </Stage>
    </div>
  );
};
