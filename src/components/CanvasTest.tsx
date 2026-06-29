"use client";

import { Stage, Layer, Rect, Text } from "react-konva";

export default function CanvasTest() {
  return (
    <Stage width={500} height={300}>
      <Layer>
        <Rect
          x={20}
          y={20}
          width={180}
          height={100}
          cornerRadius={12}
          draggable
        />
        <Text x={40} y={60} text="Drag me" fontSize={20} />
      </Layer>
    </Stage>
  );
}