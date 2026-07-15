import { create } from 'zustand';
import type { SelectedProduct } from '@/types/product';

// 상세페이지 편집(TemplateListPanel)에서 쓰는 상품 선택 상태.
// 이미지 생성 플로우의 productSelectionStore(다중 선택)와는 별개로,
// 상세페이지는 상품 하나만 선택 가능하다
interface DetailProductSelectionStore {
  selectedProduct: SelectedProduct | null;
  selectProduct: (product: SelectedProduct) => void;
  clearProduct: () => void;
}

export const useDetailProductSelectionStore =
  create<DetailProductSelectionStore>((set) => ({
    selectedProduct: null,
    selectProduct: (product) =>
      set((state) => ({
        selectedProduct:
          state.selectedProduct?.id === product.id ? null : product,
      })),
    clearProduct: () => set({ selectedProduct: null }),
  }));
