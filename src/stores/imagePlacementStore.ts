import { create } from 'zustand';

interface ActiveSlot {
  templateId: string;
  slotId: string;
}

interface ImagePlacementStore {
  // key: `${templateId}:${slotId}`
  images: Record<string, string>;
  activeSlot: ActiveSlot | null;
  openSlot: (templateId: string, slotId: string) => void;
  closeSlot: () => void;
  setImage: (templateId: string, slotId: string, src: string) => void;
}

export const getSlotImageKey = (templateId: string, slotId: string) =>
  `${templateId}:${slotId}`;

export const useImagePlacementStore = create<ImagePlacementStore>((set) => ({
  images: {},
  activeSlot: null,
  openSlot: (templateId, slotId) => set({ activeSlot: { templateId, slotId } }),
  closeSlot: () => set({ activeSlot: null }),
  setImage: (templateId, slotId, src) =>
    set((state) => ({
      images: {
        ...state.images,
        [getSlotImageKey(templateId, slotId)]: src,
      },
    })),
}));
