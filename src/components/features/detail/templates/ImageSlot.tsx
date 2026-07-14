'use client';

import { useState } from 'react';
import type Konva from 'konva';
import { Group, Image as KonvaImage, Rect, Text } from 'react-konva';
import { useHtmlImage } from '@/components/features/detail/templates/useHtmlImage';
import {
  IMAGE_SLOT_FILL,
  IMAGE_SLOT_PLACEHOLDER,
  SLOT_TEXT_FILL,
} from '@/components/features/detail/templates/templateConstants';
import { useImagePlacementStore } from '@/stores/imagePlacementStore';

interface ImageSlotProps {
  templateId: string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageSrc: string | null;
}

// --color-bg-gray-subtle-2 (Konva는 CSS 변수를 못 읽어 리터럴 값 사용)
const IMAGE_SLOT_ACTIVE_FILL = '#CDD1D5';

const PLACEHOLDER_ICON_SRC = '/assets/icons/image-placeholder.svg';
const PLACEHOLDER_ICON_SIZE = 40;
const PLACEHOLDER_ICON_TEXT_GAP = 16;
const PLACEHOLDER_FONT_SIZE = 16;
const PLACEHOLDER_LINE_HEIGHT = 1.5;
const PLACEHOLDER_TEXT_HEIGHT =
  PLACEHOLDER_FONT_SIZE * PLACEHOLDER_LINE_HEIGHT * 2; // 2줄
const PLACEHOLDER_BLOCK_HEIGHT =
  PLACEHOLDER_ICON_SIZE + PLACEHOLDER_ICON_TEXT_GAP + PLACEHOLDER_TEXT_HEIGHT;

// object-fit: cover와 동일하게, 슬롯 비율과 다른 이미지는 비율을 유지한 채
// 넘치는 부분만 잘라서(crop) 채운다 (늘리거나 줄여서 찌그러뜨리지 않는다)
const getCoverCrop = (
  image: HTMLImageElement,
  boxWidth: number,
  boxHeight: number,
) => {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const boxRatio = boxWidth / boxHeight;

  if (imageRatio > boxRatio) {
    const cropWidth = image.naturalHeight * boxRatio;
    return {
      x: (image.naturalWidth - cropWidth) / 2,
      y: 0,
      width: cropWidth,
      height: image.naturalHeight,
    };
  }

  const cropHeight = image.naturalWidth / boxRatio;
  return {
    x: 0,
    y: (image.naturalHeight - cropHeight) / 2,
    width: image.naturalWidth,
    height: cropHeight,
  };
};

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
  const placeholderIcon = useHtmlImage(image ? null : PLACEHOLDER_ICON_SRC);
  const openPanel = useImagePlacementStore((state) => state.openPanel);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const setCursor = (target: Konva.Node, cursor: string) => {
    const container = target.getStage()?.container();
    if (container) container.style.cursor = cursor;
  };

  return (
    <Group x={x} y={y}>
      <Rect
        name={`slot-${templateId}-${id}`}
        width={width}
        height={height}
        fill={isHovered || isPressed ? IMAGE_SLOT_ACTIVE_FILL : IMAGE_SLOT_FILL}
        onClick={() => openPanel()}
        onMouseEnter={(event) => {
          setIsHovered(true);
          setCursor(event.target, 'pointer');
        }}
        onMouseLeave={(event) => {
          setIsHovered(false);
          setIsPressed(false);
          setCursor(event.target, 'default');
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      />
      {image ? (
        <KonvaImage
          image={image}
          width={width}
          height={height}
          crop={getCoverCrop(image, width, height)}
          listening={false}
        />
      ) : (
        <Group x={width / 2} y={(height - PLACEHOLDER_BLOCK_HEIGHT) / 2}>
          {placeholderIcon && (
            <KonvaImage
              image={placeholderIcon}
              x={-PLACEHOLDER_ICON_SIZE / 2}
              y={0}
              width={PLACEHOLDER_ICON_SIZE}
              height={PLACEHOLDER_ICON_SIZE}
              listening={false}
            />
          )}
          <Text
            x={-width / 2}
            y={PLACEHOLDER_ICON_SIZE + PLACEHOLDER_ICON_TEXT_GAP}
            width={width}
            text={IMAGE_SLOT_PLACEHOLDER}
            align="center"
            wrap="char"
            fontSize={PLACEHOLDER_FONT_SIZE}
            fontStyle="400"
            lineHeight={PLACEHOLDER_LINE_HEIGHT}
            fill={SLOT_TEXT_FILL}
            listening={false}
          />
        </Group>
      )}
    </Group>
  );
};
