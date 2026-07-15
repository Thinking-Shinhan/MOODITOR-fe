import {
  AUTO_PLACEMENT_TEMPLATE_KEY,
  AUTO_PLACEMENT_TEMPLATE_TYPE,
  isAutoPlaceableTemplateType,
} from '@/constants/auto-placement';
import {
  TEMPLATE_IMAGE_SLOT_IDS,
  TEMPLATE_TEXT_SLOTS,
} from '@/components/features/detail/templates/templateSlotRegistry';
import {
  getSlotImageKey,
  useImagePlacementStore,
} from '@/stores/imagePlacementStore';
import {
  getTextSlotKey,
  useTextPlacementStore,
} from '@/stores/textPlacementStore';
import type { PlacedImage } from '@/stores/imagePlacementStore';
import type { PlacedTemplate } from '@/stores/detailCanvasStore';
import type {
  AutoPlacementMode,
  AutoPlacementRequest,
  AutoPlacementResponse,
  AutoPlacementTemplateBlock,
} from '@/types/autoPlacement';

interface BuildAutoPlacementRequestParams {
  productId: number;
  mode: AutoPlacementMode;
  targetInstanceKey?: string;
  placedTemplates: PlacedTemplate[];
  images: Record<string, PlacedImage>;
  texts: Record<string, string>;
}

// 캔버스 상태(placedTemplates/images/texts)로부터 자동 배치 요청 바디를 조립
// MATERIAL/SIZE_TIP은 채울 슬롯이 없어 요청에서 제외하되, blockOrder는 캔버스 상의 실제 위치를 그대로 반영(제외된 블록도 순서 계산에는 포함)
export const buildAutoPlacementRequest = ({
  productId,
  mode,
  targetInstanceKey,
  placedTemplates,
  images,
  texts,
}: BuildAutoPlacementRequestParams): AutoPlacementRequest => {
  const templateBlocks: AutoPlacementTemplateBlock[] = placedTemplates
    .map((template, index) => ({ template, blockOrder: index + 1 }))
    .filter(({ template }) => isAutoPlaceableTemplateType(template.type))
    .map(({ template, blockOrder }) => {
      const type = template.type as keyof typeof AUTO_PLACEMENT_TEMPLATE_KEY;
      const imageSlotIds = TEMPLATE_IMAGE_SLOT_IDS[type];
      const textSlots = TEMPLATE_TEXT_SLOTS[type];

      return {
        blockOrder,
        instanceKey: template.id,
        templateKey: AUTO_PLACEMENT_TEMPLATE_KEY[type],
        templateType: AUTO_PLACEMENT_TEMPLATE_TYPE[type],
        imageSlots: imageSlotIds.map((slotId, slotIndex) => {
          const image = images[getSlotImageKey(template.id, slotId)];
          return {
            slotKey: slotId,
            slotOrder: slotIndex + 1,
            assetId: image?.assetId ?? null,
          };
        }),
        textSlots: textSlots.map((slot, slotIndex) => {
          const content = texts[getTextSlotKey(template.id, slot.slotKey)];
          return {
            slotKey: slot.slotKey,
            slotOrder: slotIndex + 1,
            textRole: slot.textRole,
            recommendedMaxLength: slot.recommendedMaxLength,
            currentContent: content ?? null,
          };
        }),
      };
    });

  return {
    productId,
    mode,
    ...(targetInstanceKey ? { targetInstanceKey } : {}),
    templateBlocks,
  };
};

// 응답의 placements/copies를 각 store에 그대로 반영
// 컴포넌트 렌더링 중이 아니라 mutation 콜백에서 호출되므로 훅이 아니라 zustand의 vanilla getState()/액션을 직접 사용
export const applyAutoPlacementResponse = (response: AutoPlacementResponse) => {
  const { setImage } = useImagePlacementStore.getState();
  const { setText } = useTextPlacementStore.getState();

  response.placements.forEach((placement) => {
    setImage(placement.instanceKey, placement.slotKey, {
      url: placement.fileUrl,
      assetId: placement.assetId,
    });
  });

  response.copies.forEach((copy) => {
    setText(copy.instanceKey, copy.slotKey, copy.content);
  });
};
