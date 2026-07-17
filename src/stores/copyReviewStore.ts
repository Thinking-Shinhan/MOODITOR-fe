import { create } from 'zustand';
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

export const useCopyReviewStore = create<CopyReviewStore>((set) => ({
  isPanelOpen: false,
  items: [],
  openPanel: () => set({ isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false }),
  setItems: (items) => set({ items }),
  applyItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, status: 'applied' } : item,
      ),
    })),
  applyAll: () =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, status: 'applied' })),
    })),
}));
