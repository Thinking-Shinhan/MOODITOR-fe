import { create } from 'zustand';

interface ImagePlacementStore {
  // key: `${templateId}:${slotId}`
  images: Record<string, string>;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  setImage: (templateId: string, slotId: string, src: string) => void;
}

export const getSlotImageKey = (templateId: string, slotId: string) =>
  `${templateId}:${slotId}`;

export const useImagePlacementStore = create<ImagePlacementStore>((set) => ({
  images: {},
  isPanelOpen: false,
  openPanel: () => set({ isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false }),
  setImage: (templateId, slotId, src) =>
    set((state) => ({
      images: {
        ...state.images,
        [getSlotImageKey(templateId, slotId)]: src,
      },
    })),
}));
