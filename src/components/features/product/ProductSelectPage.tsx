'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductList } from '@/components/features/product/ProductList';
import type { Product } from '@/types/product';

// TODO: 실제 API 연결 후 제거
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    code: 'A1FMPT01BE001',
    name: '드라이모션 테일러드 팬츠 베이지',
    category: '하의',
    gender: 'M',
    color: '베이지',
    price: 89000,
    createdAt: '2026-07-03T10:30:00+09:00',
  },
  {
    id: 2,
    code: 'A1FMTS02CH002',
    name: '옥스포드 카라 셔츠 차콜',
    category: '상의',
    gender: 'M',
    color: '차콜',
    price: 59000,
    createdAt: '2026-07-02T10:30:00+09:00',
  },
  {
    id: 3,
    code: 'A1FMST03BK003',
    name: '리버시블 셋업 블랙',
    category: '셋업',
    gender: 'U',
    color: '블랙',
    price: 129000,
    createdAt: '2026-07-01T10:30:00+09:00',
  },
  {
    id: 4,
    code: 'A1FWSK04BR004',
    name: '드라이모션 테일러드 플리츠 스커트 브라운',
    category: '하의',
    gender: 'F',
    color: '브라운',
    price: 79000,
    createdAt: '2026-06-30T10:30:00+09:00',
  },
  {
    id: 5,
    code: 'A1FWTS05WH005',
    name: '실크 블라우스 화이트',
    category: '상의',
    gender: 'F',
    color: '화이트',
    price: 69000,
    createdAt: '2026-06-29T10:30:00+09:00',
  },
];

export const ProductSelectPage = () => {
  // TODO: 임시 호출 예시. 실제 필터 UI 연결 후 제거
  const { data, isLoading, isError } = useProducts({
    // category: 'top',
    // color: '브라운',
    // gender: 'F',
    // keyword: '드라이',
    page: 0,
    size: 20,
  });

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

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
      prev.size === MOCK_PRODUCTS.length
        ? new Set()
        : new Set(MOCK_PRODUCTS.map((product) => product.id)),
    );
  };

  return (
    <div className="flex h-full">
      {/* 상품 선택 영역 */}
      <div className="border-border-subtler bg-bg-white flex w-[842px] shrink-0 flex-col overflow-y-auto border-r px-9 py-7.75">
        <div className="flex flex-col gap-[var(--gap-8)]">
          상품 선택 페이지
          {isLoading && <p>불러오는 중...</p>}
          {isError && <p>상품을 불러오지 못했습니다.</p>}
          {data && (
            <ul>
              {data.products.content.map((product) => (
                <li key={product.id}>
                  {product.name} ({product.color})
                </li>
              ))}
            </ul>
          )}
          <ProductList
            products={MOCK_PRODUCTS}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            onToggleAll={handleToggleAll}
          />
        </div>
      </div>

      {/* 이미지 업로드 영역 */}
      <div className="bg-bg-gray-subtler flex flex-1 items-center justify-center"></div>
    </div>
  );
};
