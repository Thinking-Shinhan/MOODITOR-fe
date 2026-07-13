'use client';

import { Group, Rect, Text } from 'react-konva';
import {
  CANVAS_BG_FILL,
  DESCRIPTION_FONT_SIZE,
  DESCRIPTION_START_Y,
  DESCRIPTION_TEXT,
  LINE_HEIGHT,
  SLOT_STROKE,
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
        <Text
          width={SLOT.width}
          text={SUBTITLE_TEXT}
          fontSize={SUBTITLE_FONT_SIZE}
          lineHeight={LINE_HEIGHT}
          fill={SUBTITLE_COLOR}
          listening={false}
        />
        <Text
          y={TITLE_Y}
          width={SLOT.width}
          text={TITLE_TEXT}
          fontSize={TITLE_FONT_SIZE}
          lineHeight={LINE_HEIGHT}
          fontStyle="bold"
          fill={TITLE_COLOR}
          listening={false}
        />
        <Text
          y={DESCRIPTION_START_Y}
          width={SLOT.width}
          text={DESCRIPTION_TEXT}
          fontSize={DESCRIPTION_FONT_SIZE}
          lineHeight={LINE_HEIGHT}
          fill={SUBTITLE_COLOR}
          listening={false}
        />
      </Group>
    </Group>
  );
};
