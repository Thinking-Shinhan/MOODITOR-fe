import { SLOTS as IMAGE_1_1_SLOTS } from '@/components/features/detail/templates/Image1_1Template';
import { SLOTS as IMAGE_1_2_SLOTS } from '@/components/features/detail/templates/Image1_2Template';
import { SLOTS as IMAGE_2_1_SLOTS } from '@/components/features/detail/templates/Image2_1Template';
import { SLOTS as IMAGE_2_2_SLOTS } from '@/components/features/detail/templates/Image2_2Template';
import { SLOTS as IMAGE_3_1_SLOTS } from '@/components/features/detail/templates/Image3_1Template';
import { SLOTS as IMAGE_3_2_SLOTS } from '@/components/features/detail/templates/Image3_2Template';
import { SLOTS as IMAGE_4_1_SLOTS } from '@/components/features/detail/templates/Image4_1Template';
import { SLOTS as IMAGE_4_2_SLOTS } from '@/components/features/detail/templates/Image4_2Template';
import { SLOTS as SIZE_INFO_SLOTS } from '@/components/features/detail/templates/SizeInfoTemplate';
import { TEXT_SLOTS as TEXT_1_SLOTS } from '@/components/features/detail/templates/Text1Template';
import { TEXT_SLOTS as TEXT_2_SLOTS } from '@/components/features/detail/templates/Text2Template';
import { TEXT_SLOTS as TEXT_3_SLOTS } from '@/components/features/detail/templates/Text3Template';
import { TEXT_SLOTS as TEXT_4_SLOTS } from '@/components/features/detail/templates/Text4Template';
import { TEXT_SLOTS as TEXT_5_SLOTS } from '@/components/features/detail/templates/Text5Template';
import type { TextTemplateSlot } from '@/components/features/detail/templates/templateConstants';
import type { AutoPlaceableTemplateType } from '@/constants/auto-placement';

// AI 자동 배치 요청을 조립할 때, 각 템플릿 타입이 어떤 이미지/텍스트 슬롯을 갖고 있는지 알아야 한다. 각 템플릿 파일이 이미 export하는 슬롯 메타데이터를 한곳에 모아 템플릿 타입 기준으로 조회할 수 있게 한다
export const TEMPLATE_IMAGE_SLOT_IDS: Record<
  AutoPlaceableTemplateType,
  string[]
> = {
  IMAGE_1_1: IMAGE_1_1_SLOTS.map((slot) => slot.id),
  IMAGE_1_2: IMAGE_1_2_SLOTS.map((slot) => slot.id),
  IMAGE_2_1: IMAGE_2_1_SLOTS.map((slot) => slot.id),
  IMAGE_2_2: IMAGE_2_2_SLOTS.map((slot) => slot.id),
  IMAGE_3_1: IMAGE_3_1_SLOTS.map((slot) => slot.id),
  IMAGE_3_2: IMAGE_3_2_SLOTS.map((slot) => slot.id),
  IMAGE_4_1: IMAGE_4_1_SLOTS.map((slot) => slot.id),
  IMAGE_4_2: IMAGE_4_2_SLOTS.map((slot) => slot.id),
  SIZE_INFO: SIZE_INFO_SLOTS.map((slot) => slot.id),
  TEXT_1: [],
  TEXT_2: [],
  TEXT_3: [],
  TEXT_4: [],
  TEXT_5: [],
};

export const TEMPLATE_TEXT_SLOTS: Record<
  AutoPlaceableTemplateType,
  TextTemplateSlot[]
> = {
  TEXT_1: TEXT_1_SLOTS,
  TEXT_2: TEXT_2_SLOTS,
  TEXT_3: TEXT_3_SLOTS,
  TEXT_4: TEXT_4_SLOTS,
  TEXT_5: TEXT_5_SLOTS,
  IMAGE_1_1: [],
  IMAGE_1_2: [],
  IMAGE_2_1: [],
  IMAGE_2_2: [],
  IMAGE_3_1: [],
  IMAGE_3_2: [],
  IMAGE_4_1: [],
  IMAGE_4_2: [],
  SIZE_INFO: [],
};
