import type {
  CameraAngle,
  ColorTemperature,
  Framing,
  RequestAspectRatio,
} from '@/types/imageGenerationJob';

export const COLOR_TONE_OPTIONS = ['웜톤', '뉴트럴톤', '쿨톤'];

export const PROMPT_MAX_LENGTH = 500;

export const ASPECT_RATIO_OPTIONS = [
  { label: '1:1', iconClassName: 'w-[24px] h-[24px]' },
  { label: '2:3', iconClassName: 'w-[16px] h-[24px]' },
  { label: '3:4', iconClassName: 'w-[18px] h-[24px]' },
  { label: '4:5', iconClassName: 'w-[20px] h-[24px]' },
  { label: '16:9', iconClassName: 'w-[24px] h-[14px]' },
  { label: '9:16', iconClassName: 'w-[14px] h-[24px]' },
];

// 아래는 UI에 표시되는 한글 라벨을 이미지 생성 요청의 enum 값으로 변환하기 위한 매핑
export const COLOR_TEMPERATURE_MAP: Record<string, ColorTemperature> = {
  웜톤: 'WARM',
  뉴트럴톤: 'NEUTRAL',
  쿨톤: 'COOL',
};

export const CAMERA_ANGLE_MAP: Record<string, CameraAngle> = {
  정면: 'EYE_LEVEL_FRONT',
  '좌측 사선': 'LEFT_THREE_QUARTER_45',
  '우측 사선': 'RIGHT_THREE_QUARTER_45',
  후면: 'BACK_VIEW',
};

export const FRAMING_MAP: Record<string, Framing> = {
  전신: 'FULL_BODY',
  '3/4 전신': 'THREE_QUARTER_BODY',
  반신: 'HALF_BODY',
  클로즈업: 'CLOSE_UP',
  '여백 강조': 'WIDE_MARGIN',
};

export const REQUEST_ASPECT_RATIO_MAP: Record<string, RequestAspectRatio> = {
  '1:1': 'RATIO_1_1',
  '2:3': 'RATIO_2_3',
  '3:4': 'RATIO_3_4',
  '4:5': 'RATIO_4_5',
  '16:9': 'RATIO_16_9',
  '9:16': 'RATIO_9_16',
};
