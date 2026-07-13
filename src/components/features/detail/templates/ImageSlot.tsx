'use client';

import { Group, Image as KonvaImage, Rect, Text } from 'react-konva';
import { useHtmlImage } from '@/components/features/detail/templates/useHtmlImage';
import {
  IMAGE_SLOT_FILL,
  IMAGE_SLOT_PLACEHOLDER,
  SLOT_TEXT_FILL,
} from '@/components/features/detail/templates/templateConstants';

interface ImageSlotProps {
  templateId: string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageSrc: string | null;
}

// 이미지 슬롯: 이미지가 드롭되기 전에는 placeholder를,
// 드롭된 후에는 실제 이미지를 슬롯 크기에 맞춰 렌더링한다
export const ImageSlot = ({
  templateId,
  id,
  x,
  y,
  width,
  height,
  imageSrc,
}: ImageSlotProps) => {
  const image = useHtmlImage(imageSrc);

  return (
    <Group x={x} y={y}>
      <Rect
        name={`slot-${templateId}-${id}`}
        width={width}
        height={height}
        fill={IMAGE_SLOT_FILL}
      />
      {image ? (
        <KonvaImage
          image={image}
          width={width}
          height={height}
          listening={false}
        />
      ) : (
        <Text
          width={width}
          height={height}
          text={IMAGE_SLOT_PLACEHOLDER}
          align="center"
          verticalAlign="middle"
          wrap="char"
          fontSize={14}
          fill={SLOT_TEXT_FILL}
          listening={false}
        />
      )}
    </Group>
  );
};
