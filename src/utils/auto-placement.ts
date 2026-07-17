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

export const buildTemplateBlocks = (
  placedTemplates: PlacedTemplate[],
  images: Record<string, PlacedImage>,
  texts: Record<string, string>,
): AutoPlacementTemplateBlock[] =>
  placedTemplates
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

export const buildAutoPlacementRequest = ({
  productId,
  mode,
  targetInstanceKey,
  placedTemplates,
  images,
  texts,
}: BuildAutoPlacementRequestParams): AutoPlacementRequest => ({
  productId,
  mode,
  ...(targetInstanceKey ? { targetInstanceKey } : {}),
  templateBlocks: buildTemplateBlocks(placedTemplates, images, texts),
});

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
