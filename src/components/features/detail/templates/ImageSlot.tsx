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

const PLACEHOLDER_ICON_SRC = '/assets/icons/image-placeholder.svg';
const PLACEHOLDER_ICON_SIZE = 40;
const PLACEHOLDER_ICON_TEXT_GAP = 16;
const PLACEHOLDER_FONT_SIZE = 16;
const PLACEHOLDER_LINE_HEIGHT = 1.5;
const PLACEHOLDER_TEXT_HEIGHT =
  PLACEHOLDER_FONT_SIZE * PLACEHOLDER_LINE_HEIGHT * 2; // 2줄
const PLACEHOLDER_BLOCK_HEIGHT =
  PLACEHOLDER_ICON_SIZE + PLACEHOLDER_ICON_TEXT_GAP + PLACEHOLDER_TEXT_HEIGHT;

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
