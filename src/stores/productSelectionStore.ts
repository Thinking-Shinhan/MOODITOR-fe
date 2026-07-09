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
        // id가 같으면 최신 데이터(예: 새로 업로드한 imageUrl)로 덮어쓴다
        const productsById = new Map(
          state.selectedProducts.map((p) => [p.id, p]),
        );
        products.forEach((p) => productsById.set(p.id, p));
        return { selectedProducts: Array.from(productsById.values()) };
      }),
    removeProduct: (id) =>
      set((state) => ({
        selectedProducts: state.selectedProducts.filter((p) => p.id !== id),
      })),
    clearProducts: () => set({ selectedProducts: [] }),
  }),
);
