'use client';

import { Group, Rect, Text } from 'react-konva';
import { CANVAS_BG_FILL } from '@/components/features/detail/templates/templateConstants';

interface SizeTipTemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 366.2083435058594;

const CONTENT_X = 80;
const CONTENT_Y = 80;
const CONTENT_WIDTH = 719;
const CONTENT_HEIGHT = 206.2083435058594;

const HEADING_TEXT = 'SIZE TIP';
const HEADING_COLOR = '#464c53'; // --color-text-subtle
const HEADING_FONT_SIZE = 26.858;
const HEADING_HEIGHT = 40.287;

const DIVIDER_COLOR = '#e6e8ea'; // --color-border-subtler
const HEADING_NOTE_GAP = 12.208;

const NOTE_TEXT = '* 체형에 따라 다를 수 있으니 상세 사이즈표를 참고해주세요';
const NOTE_COLOR = '#b1b8be'; // --color-text-disabled
const NOTE_FONT_SIZE = 16;
const NOTE_HEIGHT = 24;

const NOTE_BODY_GAP = 32;

const BODY_LINES = [
  '55~55반 사이즈를 착용하실 경우, 1사이즈를 추천드립니다.',
  '66~66반 사이즈를 착용하실 경우, 2사이즈를 추천드립니다.',
  '66반~77반 사이즈를 착용하실 경우, 3사이즈를 추천드립니다.',
];
const BODY_TEXT_COLOR = '#464c53'; // --color-text-subtle
const BODY_FONT_SIZE = 20;
const BODY_LINE_HEIGHT = 30;
const BODY_LINE_GAP = 4;

const NOTE_Y = HEADING_HEIGHT + HEADING_NOTE_GAP;
const BODY_Y = NOTE_Y + NOTE_HEIGHT + NOTE_BODY_GAP;

export const SizeTipTemplate = ({ templateId }: SizeTipTemplateProps) => {
  return (
    <Group>
      <Rect
        width={TEMPLATE_WIDTH}
        height={TEMPLATE_HEIGHT}
        fill={CANVAS_BG_FILL}
      />
      <Group x={CONTENT_X} y={CONTENT_Y}>
        <Rect
          name={`slot-${templateId}-slot-1`}
          width={CONTENT_WIDTH}
          height={CONTENT_HEIGHT}
        />
        <Text
          width={CONTENT_WIDTH}
          text={HEADING_TEXT}
          fontSize={HEADING_FONT_SIZE}
          fontStyle="bold"
          letterSpacing={-0.61}
          fill={HEADING_COLOR}
          listening={false}
        />
        <Rect
          y={HEADING_HEIGHT}
          width={101}
          height={1.831}
          fill={DIVIDER_COLOR}
          listening={false}
        />
        <Text
          y={NOTE_Y}
          width={CONTENT_WIDTH}
          text={NOTE_TEXT}
          fontSize={NOTE_FONT_SIZE}
          fontStyle="bold"
          fill={NOTE_COLOR}
          wrap="char"
          listening={false}
        />
        {BODY_LINES.map((line, index) => (
          <Text
            key={line}
            y={BODY_Y + index * (BODY_LINE_HEIGHT + BODY_LINE_GAP)}
            width={CONTENT_WIDTH}
            text={line}
            fontSize={BODY_FONT_SIZE}
            lineHeight={1.5}
            fill={BODY_TEXT_COLOR}
            wrap="char"
            listening={false}
          />
        ))}
      </Group>
    </Group>
  );
};
