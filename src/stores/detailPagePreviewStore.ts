import { create } from 'zustand';

export type DetailPagePreviewSource = 'canvas' | 'library';

interface DetailPagePreviewStore {
  imageUrl: string | null;
  source: DetailPagePreviewSource;
  setImageUrl: (url: string, source?: DetailPagePreviewSource) => void;
  clear: () => void;
}

export const useDetailPagePreviewStore = create<DetailPagePreviewStore>(
  (set) => ({
    imageUrl: null,
    source: 'canvas',
    setImageUrl: (url, source = 'canvas') => set({ imageUrl: url, source }),
    clear: () => set({ imageUrl: null, source: 'canvas' }),
  }),
);
