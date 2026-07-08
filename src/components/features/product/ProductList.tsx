'use client';

import { ProductListHeader } from '@/components/features/product/ProductListHeader';
import { ProductListRow } from '@/components/features/product/ProductListRow';
import type { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
  selectedIds: Set<number>;
  onToggle: (product: Product) => void;
  onToggleAll: () => void;
  categoryFilter: string | null;
  onCategoryFilterChange: (value: string | null) => void;
  colorFilter: string | null;
  onColorFilterChange: (value: string | null) => void;
  genderFilter: string | null;
  onGenderFilterChange: (value: string | null) => void;
}

export const ProductList = ({
  products,
  selectedIds,
  onToggle,
  onToggleAll,
  categoryFilter,
  onCategoryFilterChange,
  colorFilter,
  onColorFilterChange,
  genderFilter,
  onGenderFilterChange,
}: ProductListProps) => {
  const allSelected =
    products.length > 0 &&
    products.every((product) => selectedIds.has(product.id));

  return (
    <div className="bg-bg-white flex w-full flex-col overflow-hidden rounded-[var(--radius-large2)]">
      <ProductListHeader
        allSelected={allSelected}
        onToggleAll={onToggleAll}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={onCategoryFilterChange}
        colorFilter={colorFilter}
        onColorFilterChange={onColorFilterChange}
        genderFilter={genderFilter}
        onGenderFilterChange={onGenderFilterChange}
      />
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
