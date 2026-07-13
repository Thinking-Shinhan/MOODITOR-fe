'use client';

import { useState } from 'react';
import { Group, Rect } from 'react-konva';
import { EditableTemplateText } from '@/components/features/detail/templates/EditableTemplateText';
import {
  CANVAS_BG_FILL,
  DESCRIPTION_FONT_SIZE,
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

interface Text2TemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 362;

const SLOT = { id: 'slot-1', x: 80, y: 80, width: 719, height: 202 };

export const Text2Template = ({ templateId }: Text2TemplateProps) => {
  const [subtitle, setSubtitle] = useState(SUBTITLE_TEXT);
  const [title, setTitle] = useState(TITLE_TEXT);
  const [description, setDescription] = useState(DESCRIPTION_TEXT);

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
        <EditableTemplateText
          y={DESCRIPTION_START_Y}
          width={SLOT.width}
          text={description}
          onChange={setDescription}
          fontSize={DESCRIPTION_FONT_SIZE}
          lineHeight={LINE_HEIGHT}
          fill={SUBTITLE_COLOR}
        />
      </Group>
    </Group>
  );
};
