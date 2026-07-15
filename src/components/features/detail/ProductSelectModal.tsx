'use client';

import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { Pagination } from '@/components/commons/Pagination';
import { Spinner } from '@/components/commons/Spinner';
import { Body, Heading } from '@/components/commons/Typography';
import { Tooltip } from '@/components/commons/Tooltip';
import { ProductList } from '@/components/features/product/ProductList';
import { ProductListToolbar } from '@/components/features/product/ProductListToolbar';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useProducts } from '@/hooks/useProducts';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import type { Product, ProductGender } from '@/types/product';

const PAGE_SIZE = 8;

interface ProductSelectModalProps {
  onClose: () => void;
}

export const ProductSelectModal = ({ onClose }: ProductSelectModalProps) => {
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const selectProduct = useDetailProductSelectionStore(
    (state) => state.selectProduct,
  );

  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
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
  const selectedIds = new Set(
    selectedProduct ? [Number(selectedProduct.id)] : [],
  );

  const handleToggle = (product: Product) => {
    selectProduct({ id: String(product.id), name: product.name, assetIds: [] });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-gray-100)]/40"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-bg-white flex max-h-[90vh] w-[999px] flex-col items-center gap-[var(--gap-8)] overflow-y-auto rounded-[var(--radius-large2)] p-[var(--padding-9)] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]"
      >
        <div className="flex w-full flex-col gap-[var(--gap-5)]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-[var(--gap-3)]">
              <Heading size="small" className="text-text-basic">
                상품 선택
              </Heading>
              <div
                onMouseEnter={() => setInfoTooltipOpen(true)}
                onMouseLeave={() => setInfoTooltipOpen(false)}
                className="relative flex items-center"
              >
                <Info size={20} className="text-icon-disabled" />
                {infoTooltipOpen && (
                  <Tooltip
                    text="라이브러리에 저장된 이미지가 있으면 상세페이지를 더 만들기 쉬워요."
                    placement="right"
                    className="absolute top-1/2 left-full ml-[var(--gap-3)] -translate-y-1/2"
                  />
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-[24px] cursor-pointer items-center justify-center"
            >
              <X size={24} className="text-icon-gray" />
            </button>
          </div>
          <ProductListToolbar
            totalCount={data?.products.totalElements ?? 0}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={handleSearchKeywordChange}
          />
          {isLoading && (
            <div className="flex w-full items-center justify-center py-12">
              <Spinner size="large" />
            </div>
          )}
          {isError && (
            <Body size="xsmall" className="text-icon-danger">
              상품을 불러오지 못했습니다.
            </Body>
          )}
          {!isLoading && !isError && (
            <ProductList
              products={products}
              selectedIds={selectedIds}
              onToggle={handleToggle}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={handleCategoryFilterChange}
              colorFilter={colorFilter}
              onColorFilterChange={handleColorFilterChange}
              genderFilter={genderFilter}
              onGenderFilterChange={handleGenderFilterChange}
            />
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
