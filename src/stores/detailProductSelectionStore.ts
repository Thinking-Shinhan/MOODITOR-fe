import { create } from 'zustand';
import type { SelectedProduct } from '@/types/product';

interface DetailProductSelectionStore {
  selectedProduct: SelectedProduct | null;
  setSelectedProduct: (product: SelectedProduct | null) => void;
  clearProduct: () => void;
}

export const useDetailProductSelectionStore =
  create<DetailProductSelectionStore>((set) => ({
    selectedProduct: null,
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    clearProduct: () => set({ selectedProduct: null }),
  }));
