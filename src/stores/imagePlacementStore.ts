import { create } from 'zustand';

// assetId는 서버에 등록된 이미지 에셋의 ID. AI 자동 배치 요청에 이미지 슬롯의
// 현재 배치 상태를 함께 보내야 해서, 서버에 없는 이미지(OS 파일 드롭)는 null이 된다
export interface PlacedImage {
  url: string;
  assetId: number | null;
}

interface ImagePlacementStore {
  // key: `${templateId}:${slotId}`
  images: Record<string, PlacedImage>;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  setImage: (templateId: string, slotId: string, image: PlacedImage) => void;
}

export const getSlotImageKey = (templateId: string, slotId: string) =>
  `${templateId}:${slotId}`;

export const useImagePlacementStore = create<ImagePlacementStore>((set) => ({
  images: {},
  isPanelOpen: false,
  openPanel: () => set({ isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false }),
  setImage: (templateId, slotId, image) =>
    set((state) => ({
      images: {
        ...state.images,
        [getSlotImageKey(templateId, slotId)]: image,
      },
    })),
}));
