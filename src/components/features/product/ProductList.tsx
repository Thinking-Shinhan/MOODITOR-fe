'use client';

import { ProductListHeader } from '@/components/features/product/ProductListHeader';
import { ProductListRow } from '@/components/features/product/ProductListRow';
import type { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
  onToggleAll: () => void;
}

export const ProductList = ({
  products,
  selectedIds,
  onToggle,
  onToggleAll,
}: ProductListProps) => {
  const allSelected =
    products.length > 0 &&
    products.every((product) => selectedIds.has(product.id));

  return (
    <div className="bg-bg-white flex w-full flex-col overflow-hidden rounded-[var(--radius-large2)]">
      <ProductListHeader allSelected={allSelected} onToggleAll={onToggleAll} />
      {products.map((product) => (
        <ProductListRow
          key={product.id}
          product={product}
          selected={selectedIds.has(product.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};
