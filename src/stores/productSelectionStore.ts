import { create } from 'zustand';
import type { SelectedProduct } from '@/types/product';

interface ProductSelectionStore {
  selectedProducts: SelectedProduct[];
  addProducts: (products: SelectedProduct[]) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
}

export const useProductSelectionStore = create<ProductSelectionStore>(
  (set) => ({
    selectedProducts: [],
    addProducts: (products) =>
      set((state) => {
        const existingIds = new Set(state.selectedProducts.map((p) => p.id));
        const newProducts = products.filter((p) => !existingIds.has(p.id));
        return {
          selectedProducts: [...state.selectedProducts, ...newProducts],
        };
      }),
    removeProduct: (id) =>
      set((state) => ({
        selectedProducts: state.selectedProducts.filter((p) => p.id !== id),
      })),
    clearProducts: () => set({ selectedProducts: [] }),
  }),
);
