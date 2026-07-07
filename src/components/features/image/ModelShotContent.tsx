'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductSelect } from '@/components/features/image/ProductSelect';
import { Heading } from '@/components/commons/Typography';
import { StepBadge } from '@/components/commons/StepBadge';
import type { SelectedProduct } from '@/types/product';

// TODO: 상품 선택 화면 연동 후 제거
const MOCK_PRODUCTS: SelectedProduct[] = [
  { id: '1', name: '상품명' },
  { id: '2', name: '상품명' },
];

export const ModelShotContent = () => {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const handleSelectArea = () => {
    // TODO: 상품 선택 화면으로 이동
    setSelectedProducts(MOCK_PRODUCTS);
  };

  const handleAddMore = () => {
    // TODO: 상품 선택 화면으로 이동
    router.push('/products');
  };

  const handleRemove = (id: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-[var(--gap-3)]">
        <StepBadge number={1} />
        <Heading size="xsmall">이미지 구성</Heading>
      </div>
      <ProductSelect
        selectedProducts={selectedProducts}
        onClickSelectArea={handleSelectArea}
        onRemoveProduct={handleRemove}
        onAddMore={handleAddMore}
      />
    </div>
  );
};
