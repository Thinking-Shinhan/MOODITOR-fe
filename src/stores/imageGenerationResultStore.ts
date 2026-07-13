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

// 모델컷/제품컷은 각자 독립된 캔버스 상태(빈 화면/로딩/결과)를 가져야 하므로,
// 스토어 인스턴스를 컷 타입별로 따로 생성한다.
const createImageGenerationResultStore = () =>
  create<ImageGenerationResultStore>((set) => ({
    status: 'idle',
    images: [],
    aspectRatio: '3:4',
    startGenerating: () => set({ status: 'loading' }),
    setResult: (images, aspectRatio) =>
      set({ status: 'success', images, aspectRatio }),
    reset: () => set({ status: 'idle', images: [] }),
  }));

export const useModelCutResultStore = createImageGenerationResultStore();
export const useProductCutResultStore = createImageGenerationResultStore();
