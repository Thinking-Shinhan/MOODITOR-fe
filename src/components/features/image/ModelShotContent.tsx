'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductSelect } from '@/components/features/image/ProductSelect';
import { ImageSelectSection } from '@/components/features/image/ImageSelectSection';
import { Heading } from '@/components/commons/Typography';
import { StepBadge } from '@/components/commons/StepBadge';
import type { SelectedProduct } from '@/types/product';

// TODO: 상품 선택 화면 연동 후 제거
const MOCK_PRODUCTS: SelectedProduct[] = [
  { id: '1', name: '상품명' },
  { id: '2', name: '상품명' },
];

// TODO: API 연동 후 제거
const MOCK_MODEL_URL =
  'https://i.pinimg.com/736x/d0/7d/e1/d07de1899b5187379f4063e2894579bc.jpg';
const MOCK_MODELS = Array.from({ length: 8 }, (_, i) => ({
  id: `model-${i + 1}`,
  url: MOCK_MODEL_URL,
}));

export const ModelShotContent = () => {
  const router = useRouter();

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const handleSelectArea = () => {
    router.push('/products');
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
      {/* 이미지 구성 헤더 (695-1528) */}
      <div className="flex items-center gap-[var(--gap-3)]">
        <StepBadge number={1} />
        <Heading size="xsmall">이미지 구성</Heading>
      </div>

      {/* 섹션들 */}
      <div className="flex flex-col gap-8">
        {/* 상품 선택 */}
        <ProductSelect
          selectedProducts={selectedProducts}
          onClickSelectArea={handleSelectArea}
          onRemoveProduct={handleRemove}
          onAddMore={handleAddMore}
        />

        {/* 모델 선택 */}
        <ImageSelectSection
          label="모델 선택"
          errorMessage="모델을 선택해 주세요."
          segments={[
            { label: '추천 모델', images: MOCK_MODELS },
            {
              label: '내 모델',
              showUpload: true,
              warningMessage: '누끼컷을 업로드하면 정확도가 높아져요.',
            },
          ]}
        />

        {/* 배경 선택 */}
        <ImageSelectSection
          label="배경 선택"
          segments={[
            { label: '추천 배경' },
            { label: '내 배경', showUpload: true },
          ]}
        />

        {/* 포즈 선택 */}
        <ImageSelectSection label="포즈 선택" />
      </div>
    </div>
  );
};
