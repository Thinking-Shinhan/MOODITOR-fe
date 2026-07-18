import { create } from 'zustand';
import { useTextPlacementStore } from '@/stores/textPlacementStore';
import { NO_SUGGESTION_TEXT } from '@/utils/reviewCopy';
import { getTemplateBlockDomId } from '@/utils/templateBlockDom';
import type { CopyReviewItem } from '@/types/reviewCopy';

interface CopyReviewStore {
  isPanelOpen: boolean;
  items: CopyReviewItem[];
  focusedInstanceKey: string | null;
  openPanel: () => void;
  closePanel: () => void;
  setItems: (items: CopyReviewItem[]) => void;
  applyItem: (id: string) => void;
  applyAll: () => void;
  focusInstance: (instanceKey: string) => void;
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
  focusedInstanceKey: null,
  openPanel: () => set({ isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false, focusedInstanceKey: null }),
  setItems: (items) => set({ items }),
  applyItem: (id) => {
    const item = get().items.find((item) => item.id === id);
    if (item) {
      applyItemToCanvas(item);
      get().focusInstance(item.instanceKey);
    }

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
  focusInstance: (instanceKey) => {
    set({ focusedInstanceKey: instanceKey });
    document
      .getElementById(getTemplateBlockDomId(instanceKey))
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
}));
