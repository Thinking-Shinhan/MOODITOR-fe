// 템플릿 캔버스 렌더링 공통 색상/폰트 상수
// Konva는 CSS 변수를 지원하지 않아 디자인 토큰의 실제 값을 직접 지정

import type { AutoPlacementTextRole } from '@/types/autoPlacement';

// AI 자동 배치 요청 조립에 쓰는 텍스트 슬롯 메타데이터
export interface TextTemplateSlot {
  slotKey: string;
  textRole: AutoPlacementTextRole;
  recommendedMaxLength: number;
}

// 폰트 크기/한 줄당 글자 수를 감안한 대략적인 권장 글자 수
export const EYEBROW_MAX_LENGTH = 30;
export const HEADLINE_MAX_LENGTH = 28;
export const BODY_MAX_LENGTH = 80;

// 템플릿 배경(흰색). 슬롯 사이 20px 간격이 흰색 구분선처럼 보이게 한다
export const CANVAS_BG_FILL = '#ffffff';
export const IMAGE_SLOT_FILL = '#e6e8ea';
export const TEXT_SLOT_FILL = '#ffffff';
export const SLOT_STROKE = '#cdd1d5'; // --color-border-subtle
export const SLOT_TEXT_FILL = '#84949e'; // --color-text-disabled-on

export const IMAGE_SLOT_PLACEHOLDER = '라이브러리에서\n사진을 선택해주세요.';
export const TEXT_SLOT_PLACEHOLDER = '텍스트를 입력하세요.';

// 텍스트 템플릿(TEXT_1~5) 전용 - 부제목/제목/설명 문단
export const TITLE_COLOR = '#1e2124'; // --color-text-basic
export const SUBTITLE_COLOR = '#6d7882'; // --color-text-subtler

export const SUBTITLE_TEXT = '부제목 텍스트를 입력하세요.';
export const TITLE_TEXT = '제목 텍스트를 입력하세요.';
export const DESCRIPTION_TEXT =
  '설명 텍스트를 입력하세요. 설명 텍스트를 입력하세요.설명 텍스트를 입력하세요.설명 텍스트 를 입력하세요.설명 텍스트를 입력하세요.설명 텍스트를 입력하세요.설명 텍스트를 입력하세';

export const SUBTITLE_FONT_SIZE = 32;
export const TITLE_FONT_SIZE = 44;
export const DESCRIPTION_FONT_SIZE = 20;
export const LINE_HEIGHT = 1.5;

const SUBTITLE_HEIGHT = SUBTITLE_FONT_SIZE * LINE_HEIGHT; // 48
const SUBTITLE_TITLE_GAP = 4;
export const TITLE_Y = SUBTITLE_HEIGHT + SUBTITLE_TITLE_GAP; // 52
const TITLE_HEIGHT = TITLE_FONT_SIZE * LINE_HEIGHT; // 66
const TITLE_DESCRIPTION_GAP = 24;
export const DESCRIPTION_START_Y =
  TITLE_Y + TITLE_HEIGHT + TITLE_DESCRIPTION_GAP; // 142
// 설명 문단은 719px 폭에서 2줄로 줄바꿈된다
export const DESCRIPTION_PARAGRAPH_HEIGHT =
  DESCRIPTION_FONT_SIZE * LINE_HEIGHT * 2; // 60
export const DESCRIPTION_PARAGRAPH_GAP = 16;
