'use client';

import { ImagePlus, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/commons/Button';
import { InputMessage } from '@/components/commons/InputMessage';
import { Body } from '@/components/commons/Typography';
import type { SelectedProduct } from '@/types/product';

interface ProductSelectProps {
  showError?: boolean;
  selectedProducts?: SelectedProduct[];
  maxSelected?: number;
  onClickSelectArea: () => void;
  onRemoveProduct?: (id: string) => void;
  onAddMore?: () => void;
}

export const ProductSelect = ({
  showError = false,
  selectedProducts = [],
  maxSelected,
  onClickSelectArea,
  onRemoveProduct,
  onAddMore,
}: ProductSelectProps) => {
  const displayedProducts = maxSelected
    ? selectedProducts.slice(0, maxSelected)
    : selectedProducts;
  const hasSelected = displayedProducts.length > 0;
  const canAddMore =
    maxSelected === undefined || displayedProducts.length < maxSelected;

  return (
    <div className="flex w-full flex-col gap-[var(--gap-4)]">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <Body size="medium" bold className="text-text-subtle">
          상품 선택
        </Body>
        {showError && (
          <InputMessage state="error" message="상품을 선택해 주세요." />
        )}
      </div>

      {hasSelected ? (
        /* 선택된 상태 */
        <div className="flex flex-col gap-[var(--gap-4)]">
          {/* 상품 목록 */}
          <div className="flex flex-col gap-[var(--gap-3)]">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-bg-gray-subtler flex items-center justify-between overflow-hidden rounded-[var(--radius-small2)] py-[var(--padding-3)] pr-[var(--padding-4)] pl-[var(--padding-3)]"
              >
                <div className="flex min-w-0 items-center gap-[var(--gap-3)]">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="size-8 shrink-0 rounded-(--radius-xsmall2) object-cover"
                    />
                  ) : (
                    <div className="bg-bg-gray-subtle size-8 shrink-0 rounded-(--radius-xsmall2)" />
                  )}
                  <Body size="xsmall" className="text-text-basic truncate">
                    {product.name}
                  </Body>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveProduct?.(product.id)}
                  aria-label={`${product.name} 삭제`}
                  className="text-btn-primary-fill ml-(--gap-3) shrink-0 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* 코디 상품 추가 버튼 */}
          {canAddMore && (
            <Button
              variant="secondary"
              size="small"
              leftIcon={<Plus size={16} />}
              onClick={onAddMore}
              className="w-full"
            >
              코디 상품 추가하기
            </Button>
          )}
        </div>
      ) : (
        /* 빈 상태 */
        <button
          type="button"
          onClick={onClickSelectArea}
          className="border-btn-outline-border hover:bg-bg-gray-subtler flex w-full cursor-pointer flex-col items-center gap-3 rounded-(--radius-large1) border-[0.8px] border-dashed px-7 py-(--gap-6) transition-colors"
        >
          <ImagePlus size={20} className="text-text-disabled-on" />
          <Body
            size="xsmall"
            bold
            className="text-text-disabled-on text-center"
          >
            상품 리스트에서 이미지 제작 시<br />
            활용할 상품을 선택해주세요.
          </Body>
        </button>
      )}
    </div>
  );
};
