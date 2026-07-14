'use client';

import { useState } from 'react';
import { Group, Rect } from 'react-konva';
import { EditableTemplateText } from '@/components/features/detail/templates/EditableTemplateText';
import {
  CANVAS_BG_FILL,
  DESCRIPTION_FONT_SIZE,
  DESCRIPTION_PARAGRAPH_GAP,
  DESCRIPTION_PARAGRAPH_HEIGHT,
  DESCRIPTION_START_Y,
  DESCRIPTION_TEXT,
  LINE_HEIGHT,
  SUBTITLE_COLOR,
  SUBTITLE_FONT_SIZE,
  SUBTITLE_TEXT,
  TEXT_SLOT_FILL,
  TITLE_COLOR,
  TITLE_FONT_SIZE,
  TITLE_TEXT,
  TITLE_Y,
} from '@/components/features/detail/templates/templateConstants';

interface Text3TemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 438;

const SLOT = { id: 'slot-1', x: 80, y: 80, width: 719, height: 278 };
const PARAGRAPH_COUNT = 2;

export const Text3Template = ({ templateId }: Text3TemplateProps) => {
  const [subtitle, setSubtitle] = useState(SUBTITLE_TEXT);
  const [title, setTitle] = useState(TITLE_TEXT);
  const [descriptions, setDescriptions] = useState<string[]>(
    Array.from({ length: PARAGRAPH_COUNT }, () => DESCRIPTION_TEXT),
  );

  const handleDescriptionChange = (index: number, value: string) => {
    setDescriptions((prev) =>
      prev.map((description, i) => (i === index ? value : description)),
    );
  };

  return (
    <Group>
      <Rect
        width={TEMPLATE_WIDTH}
        height={TEMPLATE_HEIGHT}
        fill={CANVAS_BG_FILL}
      />
      <Group x={SLOT.x} y={SLOT.y}>
        <Rect
          name={`slot-${templateId}-${SLOT.id}`}
          width={SLOT.width}
          height={SLOT.height}
          fill={TEXT_SLOT_FILL}
        />
        <EditableTemplateText
          width={SLOT.width}
          text={subtitle}
          onChange={setSubtitle}
          fontSize={SUBTITLE_FONT_SIZE}
          lineHeight={LINE_HEIGHT}
          fill={SUBTITLE_COLOR}
        />
        <EditableTemplateText
          y={TITLE_Y}
          width={SLOT.width}
          text={title}
          onChange={setTitle}
          fontSize={TITLE_FONT_SIZE}
          lineHeight={LINE_HEIGHT}
          fontStyle="bold"
          fill={TITLE_COLOR}
        />
        {descriptions.map((description, index) => (
          <EditableTemplateText
            key={index}
            y={
              DESCRIPTION_START_Y +
              index * (DESCRIPTION_PARAGRAPH_HEIGHT + DESCRIPTION_PARAGRAPH_GAP)
            }
            width={SLOT.width}
            text={description}
            onChange={(value) => handleDescriptionChange(index, value)}
            fontSize={DESCRIPTION_FONT_SIZE}
            lineHeight={LINE_HEIGHT}
            fill={SUBTITLE_COLOR}
          />
        ))}
      </Group>
    </Group>
  );
};
