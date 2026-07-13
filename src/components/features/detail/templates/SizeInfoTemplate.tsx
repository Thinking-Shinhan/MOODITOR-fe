'use client';

import { useRef } from 'react';
import { Group, Line, Rect, Text } from 'react-konva';
import type Konva from 'konva';
import { ImageSlot } from '@/components/features/detail/templates/ImageSlot';
import { useImageSlotDrop } from '@/components/features/detail/templates/useImageSlotDrop';
import { CANVAS_BG_FILL } from '@/components/features/detail/templates/templateConstants';

// 사이즈표: 서버에서 컬럼 구성/행 개수가 그대로 내려오는 걸 가정한 구조
export interface SizeInfoTableData {
  columns: string[];
  rows: string[][];
}

// 소재 특성표: 행(안감/신축성/비침/촉감/두께감)은 5개 고정, 옵션 목록과
// 선택 여부만 서버 데이터로 채워진다
export interface MaterialPropertyOption {
  label: string;
  selected: boolean;
}

interface SizeInfoTemplateProps {
  templateId: string;
  sizeTable?: SizeInfoTableData;
  // MATERIAL_PROPERTY_LABELS와 같은 순서(안감/신축성/비침/촉감/두께감)의 5개 배열
  materialProperties?: MaterialPropertyOption[][];
}

const TEMPLATE_WIDTH = 879;

const CONTENT_X = 80;
const CONTENT_Y = 80;
const CONTENT_WIDTH = 719;

// --- 상단 타이틀 영역 ---
const HEADING_TEXT = 'SIZE INFO';
const HEADING_COLOR = '#464c53'; // --color-text-subtle
const HEADING_FONT_SIZE = 26.858;
const HEADING_HEIGHT = 40.287;
const DIVIDER_COLOR = '#e6e8ea'; // --color-border-subtler
const HEADING_NOTE_GAP = 12.208;
const NOTE_TEXT = '측정 방식에 따라 1~2cm 정도 차이가 생길 수 있습니다';
const NOTE_COLOR = '#b1b8be'; // --color-text-disabled
const NOTE_FONT_SIZE = 16;
const NOTE_HEIGHT = 24;
const HEADER_BLOCK_HEIGHT = HEADING_HEIGHT + HEADING_NOTE_GAP + NOTE_HEIGHT;

// 섹션(타이틀/실측이미지/사이즈표/소재특성표) 사이 공통 간격
const SECTION_GAP = 48;

// --- 실측 이미지 ---
const IMAGE_SIZE = 400;
const IMAGE_X = (CONTENT_WIDTH - IMAGE_SIZE) / 2;

// --- 단위 라벨 ---
const UNIT_LABEL_TEXT = '단위 : cm';
const UNIT_LABEL_COLOR = '#84949e'; // --color-text-disabled-on
const UNIT_LABEL_FONT_SIZE = 12;
const UNIT_LABEL_HEIGHT = 18;
const UNIT_TABLE_GAP = 8;

// --- 사이즈표 (행 높이 고정, 컬럼 수/행 수는 데이터에 따라 동적) ---
const TABLE_ROW_HEIGHT = 38;
const TABLE_HEADER_FILL = '#f4f5f6'; // --color-bg-gray-subtler
const TABLE_HEADER_TEXT_COLOR = '#1e2124'; // --color-text-basic
const TABLE_ROW_FILL = '#ffffff';
const TABLE_ROW_TEXT_COLOR = '#464c53'; // --color-text-subtle
const TABLE_BORDER_COLOR = '#e6e8ea'; // --color-border-subtler
const TABLE_FONT_SIZE = 12;

// --- 소재 특성표 (라벨 5개 고정, 옵션 개수는 행마다 다를 수 있음) ---
const MATERIAL_PROPERTY_LABELS = ['안감', '신축성', '비침', '촉감', '두께감'];
// Figma 실측(get_metadata): 행 높이 46px, 라벨 칸은 px-40(양쪽) + 텍스트 박스 70px = 150px
const MATERIAL_ROW_HEIGHT = 46;
const MATERIAL_LABEL_WIDTH = 150;
const MATERIAL_BORDER_COLOR = '#cdd1d5'; // --color-border-subtle
const MATERIAL_LABEL_TEXT_COLOR = '#464c53'; // --color-text-subtle
const MATERIAL_OPTION_TEXT_COLOR = '#464c53';
const MATERIAL_CHECKBOX_SIZE = 14;
const MATERIAL_CHECKBOX_SELECTED_FILL = '#131416'; // --color-btn-primary-fill-black
const MATERIAL_CHECKBOX_BORDER = '#58616a'; // --color-border-basic
const MATERIAL_CHECKMARK_COLOR = '#ffffff'; // --color-icon-inverse
const MATERIAL_CHECKMARK_SIZE = 8;
// 체크박스+라벨 그룹은 옵션 칸 안에서 좌우 중앙 정렬된다 (Figma: items-center justify-center)
const MATERIAL_OPTION_GAP = 12; // --gap/4
const MATERIAL_OPTION_LABEL_WIDTH = 75;

const getCheckmarkPoints = (size: number) => {
  const scale = size / 24;
  return [20 * scale, 6 * scale, 9 * scale, 17 * scale, 4 * scale, 12 * scale];
};

// Figma 예시와 동일한 기본 데이터 (props 없이 렌더링할 때 사용)
const DEFAULT_SIZE_TABLE: SizeInfoTableData = {
  columns: [
    'SIZE',
    '총장',
    '가슴단면',
    '소매통',
    '소매길이',
    '어깨너비',
    '밑단단면',
  ],
  rows: [
    ['001', '60.5', '48.5', '32', '19.5', '40.5', '49'],
    ['002', '60.5', '48.5', '32', '19.5', '40.5', '49'],
    ['003', '60.5', '48.5', '32', '19.5', '40.5', '49'],
  ],
};

const DEFAULT_MATERIAL_PROPERTIES: MaterialPropertyOption[][] = [
  [
    { label: '기모', selected: false },
    { label: '있음', selected: false },
    { label: '없음', selected: true },
  ],
  [
    { label: '매우 좋음', selected: false },
    { label: '보통', selected: false },
    { label: '없음', selected: true },
  ],
  [
    { label: '있음', selected: false },
    { label: '약간', selected: false },
    { label: '없음', selected: true },
  ],
  [
    { label: '쾌적함', selected: false },
    { label: '부드러움', selected: false },
    { label: '드라이함', selected: true },
  ],
  [
    { label: '두꺼움', selected: false },
    { label: '보통', selected: false },
    { label: '없음', selected: true },
  ],
];

const getTableHeight = (rowCount: number) => TABLE_ROW_HEIGHT * (rowCount + 1);
const getMaterialTableHeight = () =>
  MATERIAL_ROW_HEIGHT * MATERIAL_PROPERTY_LABELS.length;

export const TEMPLATE_HEIGHT =
  CONTENT_Y +
  HEADER_BLOCK_HEIGHT +
  SECTION_GAP +
  IMAGE_SIZE +
  SECTION_GAP +
  UNIT_LABEL_HEIGHT +
  UNIT_TABLE_GAP +
  getTableHeight(DEFAULT_SIZE_TABLE.rows.length) +
  SECTION_GAP +
  getMaterialTableHeight() +
  CONTENT_Y;

interface SizeTableProps {
  y: number;
  table: SizeInfoTableData;
}

const SizeTable = ({ y, table }: SizeTableProps) => {
  const columnWidth = CONTENT_WIDTH / table.columns.length;

  return (
    <Group y={y}>
      <Rect
        width={CONTENT_WIDTH}
        height={TABLE_ROW_HEIGHT}
        fill={TABLE_HEADER_FILL}
      />
      {table.columns.map((column, columnIndex) => (
        <Text
          key={column}
          x={columnIndex * columnWidth}
          width={columnWidth}
          height={TABLE_ROW_HEIGHT}
          text={column}
          align="center"
          verticalAlign="middle"
          fontSize={TABLE_FONT_SIZE}
          fontStyle="600"
          fill={TABLE_HEADER_TEXT_COLOR}
          wrap="char"
          listening={false}
        />
      ))}
      {table.rows.map((row, rowIndex) => {
        const rowY = TABLE_ROW_HEIGHT * (rowIndex + 1);
        return (
          <Group key={rowIndex}>
            <Rect
              y={rowY}
              width={CONTENT_WIDTH}
              height={TABLE_ROW_HEIGHT}
              fill={TABLE_ROW_FILL}
            />
            {/* 상단 수평선 (좌우 테두리 제외) */}
            <Line
              points={[0, rowY, CONTENT_WIDTH, rowY]}
              stroke={TABLE_BORDER_COLOR}
              strokeWidth={1}
              listening={false}
            />
            {/* 마지막 행: 하단 수평선 추가 */}
            {rowIndex === table.rows.length - 1 && (
              <Line
                points={[
                  0,
                  rowY + TABLE_ROW_HEIGHT,
                  CONTENT_WIDTH,
                  rowY + TABLE_ROW_HEIGHT,
                ]}
                stroke={TABLE_BORDER_COLOR}
                strokeWidth={1}
                listening={false}
              />
            )}
            {row.map((value, columnIndex) => (
              <Text
                key={columnIndex}
                x={columnIndex * columnWidth}
                y={rowY}
                width={columnWidth}
                height={TABLE_ROW_HEIGHT}
                text={value}
                align="center"
                verticalAlign="middle"
                fontSize={TABLE_FONT_SIZE}
                fill={TABLE_ROW_TEXT_COLOR}
                wrap="char"
                listening={false}
              />
            ))}
          </Group>
        );
      })}
    </Group>
  );
};

interface MaterialPropertyTableProps {
  y: number;
  rows: MaterialPropertyOption[][];
}

const MaterialPropertyTable = ({ y, rows }: MaterialPropertyTableProps) => {
  const optionAreaWidth = CONTENT_WIDTH - MATERIAL_LABEL_WIDTH;

  return (
    <Group y={y}>
      <Rect
        width={CONTENT_WIDTH}
        height={MATERIAL_ROW_HEIGHT * MATERIAL_PROPERTY_LABELS.length}
        stroke={MATERIAL_BORDER_COLOR}
        strokeWidth={1}
      />
      {MATERIAL_PROPERTY_LABELS.map((label, rowIndex) => {
        const rowY = rowIndex * MATERIAL_ROW_HEIGHT;
        const options = rows[rowIndex] ?? [];
        const optionWidth =
          options.length > 0 ? optionAreaWidth / options.length : 0;

        return (
          <Group key={label} y={rowY}>
            {rowIndex > 0 && (
              <Rect
                width={CONTENT_WIDTH}
                height={1}
                fill={MATERIAL_BORDER_COLOR}
              />
            )}
            <Rect
              width={MATERIAL_LABEL_WIDTH}
              height={MATERIAL_ROW_HEIGHT}
              stroke={MATERIAL_BORDER_COLOR}
              strokeWidth={1}
            />
            <Text
              width={MATERIAL_LABEL_WIDTH}
              height={MATERIAL_ROW_HEIGHT}
              text={label}
              align="center"
              verticalAlign="middle"
              fontSize={TABLE_FONT_SIZE}
              fontStyle="600"
              fill={MATERIAL_LABEL_TEXT_COLOR}
              listening={false}
            />
            {options.map((option, optionIndex) => {
              const optionX = MATERIAL_LABEL_WIDTH + optionIndex * optionWidth;
              const checkboxY =
                (MATERIAL_ROW_HEIGHT - MATERIAL_CHECKBOX_SIZE) / 2;
              // 체크박스+라벨 그룹 전체를 옵션 칸 가운데로 정렬한다
              const groupWidth =
                MATERIAL_CHECKBOX_SIZE +
                MATERIAL_OPTION_GAP +
                MATERIAL_OPTION_LABEL_WIDTH;
              const groupX = optionX + (optionWidth - groupWidth) / 2;
              return (
                <Group key={optionIndex}>
                  <Rect
                    x={groupX}
                    y={checkboxY}
                    width={MATERIAL_CHECKBOX_SIZE}
                    height={MATERIAL_CHECKBOX_SIZE}
                    cornerRadius={4}
                    fill={
                      option.selected
                        ? MATERIAL_CHECKBOX_SELECTED_FILL
                        : '#ffffff'
                    }
                    stroke={
                      option.selected ? undefined : MATERIAL_CHECKBOX_BORDER
                    }
                    strokeWidth={option.selected ? 0 : 1}
                    listening={false}
                  />
                  {option.selected && (
                    <Line
                      x={
                        groupX +
                        (MATERIAL_CHECKBOX_SIZE - MATERIAL_CHECKMARK_SIZE) / 2
                      }
                      y={
                        checkboxY +
                        (MATERIAL_CHECKBOX_SIZE - MATERIAL_CHECKMARK_SIZE) / 2
                      }
                      points={getCheckmarkPoints(MATERIAL_CHECKMARK_SIZE)}
                      stroke={MATERIAL_CHECKMARK_COLOR}
                      strokeWidth={1.5}
                      lineCap="round"
                      lineJoin="round"
                      listening={false}
                    />
                  )}
                  <Text
                    x={groupX + MATERIAL_CHECKBOX_SIZE + MATERIAL_OPTION_GAP}
                    width={MATERIAL_OPTION_LABEL_WIDTH}
                    height={MATERIAL_ROW_HEIGHT}
                    text={option.label}
                    verticalAlign="middle"
                    fontSize={TABLE_FONT_SIZE}
                    fill={MATERIAL_OPTION_TEXT_COLOR}
                    wrap="char"
                    listening={false}
                  />
                </Group>
              );
            })}
          </Group>
        );
      })}
    </Group>
  );
};

const IMAGE_SLOT = {
  id: 'slot-image',
  x: IMAGE_X,
  y: HEADER_BLOCK_HEIGHT + SECTION_GAP,
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  type: 'image' as const,
};

export const SizeInfoTemplate = ({
  templateId,
  sizeTable = DEFAULT_SIZE_TABLE,
  materialProperties = DEFAULT_MATERIAL_PROPERTIES,
}: SizeInfoTemplateProps) => {
  const rootRef = useRef<Konva.Group>(null);
  const images = useImageSlotDrop(rootRef, templateId, [IMAGE_SLOT]);

  const unitLabelY = IMAGE_SLOT.y + IMAGE_SIZE + SECTION_GAP;
  const sizeTableY = unitLabelY + UNIT_LABEL_HEIGHT + UNIT_TABLE_GAP;
  const materialTableY =
    sizeTableY + getTableHeight(sizeTable.rows.length) + SECTION_GAP;
  // materialTableY는 콘텐츠 그룹(y={CONTENT_Y}) 기준 상대 좌표라 상단 여백은
  // 이미 그룹 오프셋으로 반영돼 있다. 배경 높이에는 상단/하단 패딩을 각각 더해야 한다.
  const templateHeight =
    CONTENT_Y + materialTableY + getMaterialTableHeight() + CONTENT_Y;

  return (
    <Group ref={rootRef}>
      <Rect
        width={TEMPLATE_WIDTH}
        height={templateHeight}
        fill={CANVAS_BG_FILL}
      />
      <Group x={CONTENT_X} y={CONTENT_Y}>
        <Rect
          name={`slot-${templateId}-heading`}
          width={CONTENT_WIDTH}
          height={HEADER_BLOCK_HEIGHT}
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
          width={CONTENT_WIDTH}
          height={1}
          fill={DIVIDER_COLOR}
          listening={false}
        />
        <Text
          y={HEADING_HEIGHT + HEADING_NOTE_GAP}
          width={CONTENT_WIDTH}
          text={NOTE_TEXT}
          fontSize={NOTE_FONT_SIZE}
          fontStyle="bold"
          fill={NOTE_COLOR}
          wrap="char"
          listening={false}
        />

        <ImageSlot
          templateId={templateId}
          id={IMAGE_SLOT.id}
          x={IMAGE_SLOT.x}
          y={IMAGE_SLOT.y}
          width={IMAGE_SLOT.width}
          height={IMAGE_SLOT.height}
          imageSrc={images[IMAGE_SLOT.id] ?? null}
        />

        <Text
          y={unitLabelY}
          width={CONTENT_WIDTH}
          text={UNIT_LABEL_TEXT}
          fontSize={UNIT_LABEL_FONT_SIZE}
          fill={UNIT_LABEL_COLOR}
          listening={false}
        />
        <SizeTable y={sizeTableY} table={sizeTable} />
        <MaterialPropertyTable y={materialTableY} rows={materialProperties} />
      </Group>
    </Group>
  );
};
