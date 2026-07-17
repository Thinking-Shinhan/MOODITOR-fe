import { create } from 'zustand';

interface CopyReviewStore {
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

export const useCopyReviewStore = create<CopyReviewStore>((set) => ({
  isPanelOpen: false,
  openPanel: () => set({ isPanelOpen: true }),
  closePanel: () => set({ isPanelOpen: false }),
}));
