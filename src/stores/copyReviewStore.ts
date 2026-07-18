import { create } from 'zustand';
import { useTextPlacementStore } from '@/stores/textPlacementStore';
import { NO_SUGGESTION_TEXT } from '@/utils/reviewCopy';
import type { CopyReviewItem } from '@/types/reviewCopy';

interface CopyReviewStore {
  isPanelOpen: boolean;
  items: CopyReviewItem[];
  openPanel: () => void;
  closePanel: () => void;
  setItems: (items: CopyReviewItem[]) => void;
  applyItem: (id: string) => void;
  applyAll: () => void;
}

// 제안 문구가 있는 항목만 캔버스 텍스트 슬롯에 실제로 반영한다
const applyItemToCanvas = (item: CopyReviewItem) => {
  if (item.suggestedText === NO_SUGGESTION_TEXT) return;
  useTextPlacementStore
    .getState()
    .setText(item.instanceKey, item.slotKey, item.suggestedText);
};

export const useCopyReviewStore = create<CopyReviewStore>((set, get) => ({
  isPanelOpen: false,
  items: [],
  openPanel: () => set({ isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false }),
  setItems: (items) => set({ items }),
  applyItem: (id) => {
    const item = get().items.find((item) => item.id === id);
    if (item) applyItemToCanvas(item);

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status: 'applied' } : item,
      ),
    }));
  },
  applyAll: () => {
    get().items.forEach(applyItemToCanvas);

    set((state) => ({
      items: state.items.map((item) => ({ ...item, status: 'applied' })),
    }));
  },
}));
