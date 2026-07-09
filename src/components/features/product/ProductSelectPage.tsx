'use client';

import { useMemo, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { ProductList } from '@/components/features/product/ProductList';
import { ProductListToolbar } from '@/components/features/product/ProductListToolbar';
import { ProductSelectHeader } from '@/components/features/product/ProductSelectHeader';
import { ProductImageUploadPanel } from '@/components/features/product/ProductImageUploadPanel';
import { ProductImageUploadEmptyState } from '@/components/features/product/ProductImageUploadEmptyState';
import { Pagination } from '@/components/commons/Pagination';
import type { Product, ProductGender } from '@/types/product';

const PAGE_SIZE = 11;

export const ProductSelectPage = () => {
  // 페이지네이션으로 목록이 바뀌어도 이전에 선택한 상품 데이터를 잃지 않도록 전체 Product를 보관
  const [selectedProductsMap, setSelectedProductsMap] = useState<
    Map<number, Product>
  >(new Map());
  const selectedIds = useMemo(
    () => new Set(selectedProductsMap.keys()),
    [selectedProductsMap],
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedKeyword = useDebouncedValue(searchKeyword);

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (value: string | null) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleColorFilterChange = (value: string | null) => {
    setColorFilter(value);
    setCurrentPage(1);
  };

  const handleGenderFilterChange = (value: string | null) => {
    setGenderFilter(value);
    setCurrentPage(1);
  };

  const { data, isLoading, isError } = useProducts({
    category: categoryFilter ?? undefined,
    color: colorFilter ?? undefined,
    gender: (genderFilter as ProductGender) ?? undefined,
    keyword: debouncedKeyword || undefined,
    page: currentPage - 1,
    size: PAGE_SIZE,
  });

  const products = data?.products.content ?? [];
  const totalPages = data?.products.totalPages ?? 1;

  const handleToggle = (product: Product) => {
    setSelectedProductsMap((prev) => {
      const next = new Map(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.set(product.id, product);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    setSelectedProductsMap((prev) => {
      const allSelected = products.every((product) => prev.has(product.id));
      const next = new Map(prev);
      products.forEach((product) => {
        if (allSelected) {
          next.delete(product.id);
        } else {
          next.set(product.id, product);
        }
      });
      return next;
    });
  };

  return (
    <div className="flex h-full">
      {/* 상품 선택 영역 */}
      <div className="border-border-subtler bg-bg-white flex w-[842px] shrink-0 flex-col overflow-y-auto border-r p-8">
        <div className="flex flex-col gap-[var(--gap-8)]">
          <ProductSelectHeader />
          <div className="flex flex-col gap-[var(--gap-5)]">
            <ProductListToolbar
              selectedCount={selectedIds.size}
              totalCount={data?.products.totalElements ?? 0}
              searchKeyword={searchKeyword}
              onSearchKeywordChange={handleSearchKeywordChange}
            />
            {isLoading && <p>불러오는 중...</p>}
            {isError && <p>상품을 불러오지 못했습니다.</p>}
            {!isLoading && !isError && (
              <ProductList
                products={products}
                selectedIds={selectedIds}
                onToggle={handleToggle}
                onToggleAll={handleToggleAll}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={handleCategoryFilterChange}
                colorFilter={colorFilter}
                onColorFilterChange={handleColorFilterChange}
                genderFilter={genderFilter}
                onGenderFilterChange={handleGenderFilterChange}
              />
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-12 justify-center"
            />
          </div>
        </div>
      </div>

      {/* 이미지 업로드 영역 */}
      <div
        className={`bg-bg-gray-subtler flex flex-1 justify-center ${selectedIds.size > 0 ? 'pt-8' : ''}`}
      >
        {selectedIds.size > 0 ? (
          <ProductImageUploadPanel
            selectedProducts={Array.from(selectedProductsMap.values())}
          />
        ) : (
          <ProductImageUploadEmptyState />
        )}
      </div>
    </div>
  );
};
