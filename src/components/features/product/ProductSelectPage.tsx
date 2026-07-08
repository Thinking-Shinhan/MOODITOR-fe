'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { ProductList } from '@/components/features/product/ProductList';
import { ProductListToolbar } from '@/components/features/product/ProductListToolbar';
import { Pagination } from '@/components/commons/Pagination';
import type { ProductGender } from '@/types/product';

// TODO: UI 확인 후 useProducts의 page/totalPages와 연결 예정
const TEMP_TOTAL_PAGES = 5;

export const ProductSelectPage = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchKeyword, setSearchKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedKeyword = useDebouncedValue(searchKeyword);

  const { data, isLoading, isError } = useProducts({
    category: categoryFilter ?? undefined,
    color: colorFilter ?? undefined,
    gender: (genderFilter as ProductGender) ?? undefined,
    keyword: debouncedKeyword || undefined,
    page: 0,
    size: 20,
  });

  const products = data?.products.content ?? [];

  const handleToggle = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    setSelectedIds((prev) =>
      products.every((product) => prev.has(product.id))
        ? new Set()
        : new Set(products.map((product) => product.id)),
    );
  };

  return (
    <div className="flex h-full">
      {/* 상품 선택 영역 */}
      <div className="border-border-subtler bg-bg-white flex w-[842px] shrink-0 flex-col overflow-y-auto border-r px-9 py-7.75">
        <div className="flex flex-col gap-[var(--gap-5)]">
          <ProductListToolbar
            selectedCount={selectedIds.size}
            totalCount={data?.products.totalElements ?? 0}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={setSearchKeyword}
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
              onCategoryFilterChange={setCategoryFilter}
              colorFilter={colorFilter}
              onColorFilterChange={setColorFilter}
              genderFilter={genderFilter}
              onGenderFilterChange={setGenderFilter}
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={TEMP_TOTAL_PAGES}
            onPageChange={setCurrentPage}
            className="justify-center"
          />
        </div>
      </div>

      {/* 이미지 업로드 영역 */}
      <div className="bg-bg-gray-subtler flex flex-1 items-center justify-center"></div>
    </div>
  );
};
