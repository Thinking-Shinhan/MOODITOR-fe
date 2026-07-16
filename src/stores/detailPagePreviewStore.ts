import { create } from 'zustand';

// 편집 화면에서 합성한 이미지를 미리보기 페이지(다른 라우트)로 넘겨주는 용도.
// Next.js App Router의 클라이언트 사이드 네비게이션은 document를 새로 만들지
// 않아서, 여기 저장한 blob: URL은 라우트 이동 후에도 그대로 유효하다
interface DetailPagePreviewStore {
  imageUrl: string | null;
  setImageUrl: (url: string) => void;
  clear: () => void;
}

export const useDetailPagePreviewStore = create<DetailPagePreviewStore>(
  (set) => ({
    imageUrl: null,
    setImageUrl: (url) => set({ imageUrl: url }),
    clear: () => set({ imageUrl: null }),
  }),
);
