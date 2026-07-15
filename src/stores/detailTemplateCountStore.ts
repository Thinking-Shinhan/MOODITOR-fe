import { create } from 'zustand';

interface DetailTemplateCountStore {
  count: number;
  setCount: (count: number) => void;
}

export const useDetailTemplateCountStore = create<DetailTemplateCountStore>(
  (set) => ({
    count: 0,
    setCount: (count) => set({ count }),
  }),
);
