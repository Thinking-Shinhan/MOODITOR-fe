import type { DetailTemplateType } from '@/types/template';

// TODO: 실제 템플릿 높이는 콘텐츠에 따라 가변적일 수 있어 추후 조정 필요 (우선 더미값)
export const DETAIL_TEMPLATE_HEIGHTS: Record<DetailTemplateType, number> = {
  IMAGE_1_1: 1100,
  IMAGE_1_2: 660,
  IMAGE_2_1: 660,
  IMAGE_2_2: 1100,
  IMAGE_3_1: 1100,
  IMAGE_3_2: 1100,
  IMAGE_4_1: 1320,
  IMAGE_4_2: 880,
  TEXT_1: 200,
  TEXT_2: 280,
  TEXT_3: 360,
  TEXT_4: 440,
  TEXT_5: 520,
  MATERIAL: 600,
  SIZE_TIP: 400,
  SIZE_INFO: 600,
};
