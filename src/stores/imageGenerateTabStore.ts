import { create } from 'zustand';

interface ImageGenerateTabStore {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
}

export const useImageGenerateTabStore = create<ImageGenerateTabStore>(
  (set) => ({
    activeTabIndex: 0,
    setActiveTabIndex: (index) => set({ activeTabIndex: index }),
  }),
);
