import type { DetailTemplateType } from '@/types/template';
import type { AutoPlacementTemplateType } from '@/types/autoPlacement';

// AI 자동 배치는 MATERIAL/SIZE_TIP을 채울 게 없어 요청에서 제외한다.
// SIZE_INFO는 실측 이미지 슬롯 하나만 있어 IMAGE 블록으로 취급한다
export type AutoPlaceableTemplateType = Exclude<
  DetailTemplateType,
  'MATERIAL' | 'SIZE_TIP'
>;

export const isAutoPlaceableTemplateType = (
  type: DetailTemplateType,
): type is AutoPlaceableTemplateType =>
  type !== 'MATERIAL' && type !== 'SIZE_TIP';

// 백엔드가 고정 관리하는 값이 아니라 프론트에서 의미 있게 정한 키.
// 응답에서 그대로 echo되어 돌아오지 않고, 요청 시 템플릿 종류를 알려주는 용도
export const AUTO_PLACEMENT_TEMPLATE_KEY: Record<
  AutoPlaceableTemplateType,
  string
> = {
  IMAGE_1_1: 'single-image-portrait',
  IMAGE_1_2: 'single-image-landscape',
  IMAGE_2_1: 'double-image-horizontal',
  IMAGE_2_2: 'double-image-vertical',
  IMAGE_3_1: 'triple-image-two-one',
  IMAGE_3_2: 'triple-image-one-two',
  IMAGE_4_1: 'quad-image-grid-portrait',
  IMAGE_4_2: 'quad-image-grid-landscape',
  TEXT_1: 'text-eyebrow-headline',
  TEXT_2: 'text-eyebrow-headline-body-1',
  TEXT_3: 'text-eyebrow-headline-body-2',
  TEXT_4: 'text-eyebrow-headline-body-3',
  TEXT_5: 'text-eyebrow-headline-body-4',
  SIZE_INFO: 'single-image-size-info',
};

export const AUTO_PLACEMENT_TEMPLATE_TYPE: Record<
  AutoPlaceableTemplateType,
  AutoPlacementTemplateType
> = {
  IMAGE_1_1: 'IMAGE',
  IMAGE_1_2: 'IMAGE',
  IMAGE_2_1: 'IMAGE',
  IMAGE_2_2: 'IMAGE',
  IMAGE_3_1: 'IMAGE',
  IMAGE_3_2: 'IMAGE',
  IMAGE_4_1: 'IMAGE',
  IMAGE_4_2: 'IMAGE',
  TEXT_1: 'TEXT',
  TEXT_2: 'TEXT',
  TEXT_3: 'TEXT',
  TEXT_4: 'TEXT',
  TEXT_5: 'TEXT',
  SIZE_INFO: 'IMAGE',
};
