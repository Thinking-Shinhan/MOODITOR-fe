'use client';

import { Group, Image as KonvaImage, Line, Rect, Text } from 'react-konva';
import { useHtmlImage } from '@/components/features/detail/templates/useHtmlImage';
import { TITLE_COLOR } from '@/components/features/detail/templates/templateConstants';

interface MaterialTemplateProps {
  templateId: string;
}

const TEMPLATE_WIDTH = 879;
export const TEMPLATE_HEIGHT = 1046;

const TEMPLATE_BG_FILL = '#E6E8EA';
const CARD_BG_FILL = '#ffffff';
const DASHED_BORDER_COLOR = '#b1b8be'; // --color-btn-outline-border
const DIVIDER_COLOR = '#e6e8ea'; // --color-border-subtler
const ROW_TITLE_COLOR = '#464c53'; // --color-text-subtle
const ROW_DESCRIPTION_COLOR = '#6d7882'; // --color-text-subtler

const CONTENT_X = 80;
const CONTENT_Y = 80;
const CONTENT_WIDTH = 719;
const HEADING_TEXT = 'CLEANING TIP';
const HEADING_HEIGHT = 54;
const HEADING_GAP = 32;

const ROW_HEIGHT = 160;
const ICON_SIZE = 160;
const ICON_IMAGE_SIZE = 96;
const TEXT_PADDING_X = 40;
const ROW_TITLE_Y = 34;
const ROW_DESCRIPTION_Y = 78;

const CARE_ROWS = [
  {
    id: 'wash-30',
    icon: '/assets/icons/material-care/wash-30.svg',
    title: '30°C 이하에서 세탁 가능',
    description:
      '최대 30°C의 온도로 부드럽게 세탁하세요.\n섬세한 세탁 코스를 사용하거나 손세탁을 권장합니다.',
  },
  {
    id: 'no-bleach',
    icon: '/assets/icons/material-care/no-bleach.svg',
    title: '표백 금지',
    description:
      '표백제는 사용하지 마세요.\n염소나 산소계 표백제를 모두 피해야 합니다.',
  },
  {
    id: 'iron-low',
    icon: '/assets/icons/material-care/iron-low.svg',
    title: '저온 다림질 (최대 110°C)',
    description:
      '다림질 시 낮은 온도로 설정하세요. 섬유 손상을 방지하기 위해\n다림질 시 천을 덮어 다림질하거나 스팀 사용을 최소화하세요.',
  },
  {
    id: 'dry-clean-p',
    icon: '/assets/icons/material-care/dry-clean-p.svg',
    title: '드라이클리닝 가능 (P)',
    description:
      '전문 드라이클리닝 업체에서 세탁이 가능합니다.\n퍼클로로에틸렌 및 특정 용제를 사용할 수 있습니다.',
  },
  {
    id: 'no-tumble-dry',
    icon: '/assets/icons/material-care/no-tumble-dry.svg',
    title: '회전식 건조기 사용 금지',
    description:
      '건조기를 사용하지 말고 자연건조를 권장합니다.\n(예: 평평한 곳에서 건조 또는 그늘에 널어 건조)',
  },
];

const CareIcon = ({ src }: { src: string }) => {
  const image = useHtmlImage(src);
  if (!image || !image.naturalWidth || !image.naturalHeight) return null;

  // 비율을 유지한 채 ICON_IMAGE_SIZE 안에 맞춘다 (object-fit: contain)
  const scale = Math.min(
    ICON_IMAGE_SIZE / image.naturalWidth,
    ICON_IMAGE_SIZE / image.naturalHeight,
  );
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;

  return (
    <KonvaImage
      image={image}
      x={(ICON_SIZE - width) / 2}
      y={(ICON_SIZE - height) / 2}
      width={width}
      height={height}
      listening={false}
    />
  );
};

export const MaterialTemplate = ({ templateId }: MaterialTemplateProps) => {
  const boxHeight = ROW_HEIGHT * CARE_ROWS.length;
  const boxY = CONTENT_Y + HEADING_HEIGHT + HEADING_GAP;
  const textCellWidth = CONTENT_WIDTH - ICON_SIZE;

  return (
    <Group>
      <Rect
        width={TEMPLATE_WIDTH}
        height={TEMPLATE_HEIGHT}
        fill={TEMPLATE_BG_FILL}
      />
      <Text
        x={CONTENT_X}
        y={CONTENT_Y}
        width={CONTENT_WIDTH}
        text={HEADING_TEXT}
        fontSize={36}
        fontStyle="bold"
        fill={TITLE_COLOR}
        listening={false}
      />
      <Group x={CONTENT_X} y={boxY}>
        <Rect
          name={`slot-${templateId}-slot-1`}
          width={CONTENT_WIDTH}
          height={boxHeight}
          stroke={DASHED_BORDER_COLOR}
          strokeWidth={1.5}
          dash={[6, 6]}
        />
        {CARE_ROWS.map((row, index) => (
          <Group key={row.id} y={index * ROW_HEIGHT}>
            <Rect width={ICON_SIZE} height={ROW_HEIGHT} fill={CARD_BG_FILL} />
            <Line
              points={[ICON_SIZE, 0, ICON_SIZE, ROW_HEIGHT]}
              stroke={DASHED_BORDER_COLOR}
              strokeWidth={1.5}
              dash={[6, 6]}
            />
            <CareIcon src={row.icon} />
            <Group x={ICON_SIZE}>
              <Rect
                width={textCellWidth}
                height={ROW_HEIGHT}
                fill={CARD_BG_FILL}
              />
              <Text
                x={TEXT_PADDING_X}
                y={ROW_TITLE_Y}
                width={textCellWidth - TEXT_PADDING_X * 2}
                text={row.title}
                fontSize={24}
                fontStyle="bold"
                fill={ROW_TITLE_COLOR}
                wrap="char"
                listening={false}
              />
              <Text
                x={TEXT_PADDING_X}
                y={ROW_DESCRIPTION_Y}
                width={textCellWidth - TEXT_PADDING_X * 2}
                text={row.description}
                fontSize={16}
                lineHeight={1.5}
                fill={ROW_DESCRIPTION_COLOR}
                wrap="char"
                listening={false}
              />
            </Group>
            {index > 0 && (
              <Rect width={CONTENT_WIDTH} height={1} fill={DIVIDER_COLOR} />
            )}
          </Group>
        ))}
      </Group>
    </Group>
  );
};
