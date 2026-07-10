import { create } from 'zustand';
import type { ImageAspectRatio } from '@/types/image';

export type ImageGenerationStatus = 'idle' | 'loading' | 'success';

interface GeneratedImageItem {
  id: string;
  url: string;
}

interface ImageGenerationResultStore {
  status: ImageGenerationStatus;
  images: GeneratedImageItem[];
  aspectRatio: ImageAspectRatio;
  startGenerating: () => void;
  setResult: (
    images: GeneratedImageItem[],
    aspectRatio: ImageAspectRatio,
  ) => void;
  reset: () => void;
}

export const useImageGenerationResultStore = create<ImageGenerationResultStore>(
  (set) => ({
    status: 'idle',
    images: [],
    aspectRatio: '3:4',
    startGenerating: () => set({ status: 'loading' }),
    setResult: (images, aspectRatio) =>
      set({ status: 'success', images, aspectRatio }),
    reset: () => set({ status: 'idle', images: [] }),
  }),
);
