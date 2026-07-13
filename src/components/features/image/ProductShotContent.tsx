'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductSelect } from '@/components/features/image/ProductSelect';
import { ProductCompositionSelect } from '@/components/features/image/ProductCompositionSelect';
import { ImageSelectSection } from '@/components/features/image/ImageSelectSection';
import { ColorToneSelect } from '@/components/features/image/ColorToneSelect';
import { AspectRatioSelect } from '@/components/features/image/AspectRatioSelect';
import { PromptInput } from '@/components/features/image/PromptInput';
import { StepSectionHeader } from '@/components/commons/StepSectionHeader';
import { Button } from '@/components/commons/Button';
import { useProductSelectionStore } from '@/stores/productSelectionStore';
import { useReferenceAssets } from '@/hooks/useReferenceAssets';
import type { SelectedProduct } from '@/types/product';

// 제품컷은 상품을 하나만 선택할 수 있음
const MAX_SELECTED_PRODUCTS = 1;

// 임시 폼 구조
interface ProductShotFormData {
  products: SelectedProduct[];
  compositionReferenceAssetId: number | null;
  backgroundReferenceAssetId: number | null;
  colorTone: string | null;
  prompt: string;
  aspectRatio: string | null;
}

export const ProductShotContent = () => {
  const router = useRouter();

  const selectedProducts = useProductSelectionStore(
    (state) => state.selectedProducts,
  );
  const removeProduct = useProductSelectionStore(
    (state) => state.removeProduct,
  );

  const [compositionReferenceAssetId, setCompositionReferenceAssetId] =
    useState<number | null>(null);
  const [backgroundReferenceAssetId, setBackgroundReferenceAssetId] = useState<
    number | null
  >(null);
  const [colorTone, setColorTone] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

  const { data: backgroundAssets } = useReferenceAssets('SHOT_REFERENCE');
  const backgroundImages =
    backgroundAssets?.referenceAssets.map((asset) => ({
      id: String(asset.referenceAssetId),
      url: asset.imageUrl,
    })) ?? [];

  const formData = useMemo<ProductShotFormData>(
    () => ({
      products: selectedProducts,
      compositionReferenceAssetId,
      backgroundReferenceAssetId,
      colorTone,
      prompt,
      aspectRatio,
    }),
    [
      selectedProducts,
      compositionReferenceAssetId,
      backgroundReferenceAssetId,
      colorTone,
      prompt,
      aspectRatio,
    ],
  );

  // TODO: 폼 데이터 상태를 확인하기 위한 임시 useEffect, 실제 구현 시 제거
  useEffect(() => {
    console.log('제품컷 생성 폼 데이터:', formData);
  }, [formData]);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const showProductError = submitAttempted && selectedProducts.length === 0;
  const showCompositionError =
    submitAttempted && compositionReferenceAssetId === null;

  const productSectionRef = useRef<HTMLDivElement>(null);
  const compositionSectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    setSubmitAttempted(true);

    if (selectedProducts.length === 0) {
      productSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    if (compositionReferenceAssetId === null) {
      compositionSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    // TODO: 완료 동작(제출/API 연동)은 스펙 확정 후 구현
  };

  const handleSelectArea = () => {
    router.push('/products');
  };

  const handleSelectBackground = (id: string | null) => {
    setBackgroundReferenceAssetId(id ? Number(id) : null);
  };

  const handleSelectComposition = (id: string | null) => {
    setCompositionReferenceAssetId(id ? Number(id) : null);
  };

  return (
    <div className="flex flex-col gap-[var(--gap-8)]">
      {/* 1. 이미지 구성 */}
      <div className="flex flex-col gap-[var(--gap-5)]">
        <StepSectionHeader number={1} title="이미지 구성" />

        {/* 섹션들 */}
        <div className="flex flex-col gap-[var(--gap-8)]">
          <div ref={productSectionRef}>
            <ProductSelect
              selectedProducts={selectedProducts}
              maxSelected={MAX_SELECTED_PRODUCTS}
              showError={showProductError}
              onClickSelectArea={handleSelectArea}
              onRemoveProduct={removeProduct}
            />
          </div>
          <div ref={compositionSectionRef}>
            <ProductCompositionSelect
              showError={showCompositionError}
              onSelect={handleSelectComposition}
            />
          </div>
          <ImageSelectSection
            label="배경 선택"
            onSelect={handleSelectBackground}
            segments={[
              { label: '추천 배경', images: backgroundImages },
              { label: '내 배경', showUpload: true },
            ]}
          />
        </div>
      </div>

      <div className="border-border-subtler border-t" />

      {/* 2. 이미지 스타일 */}
      <div className="flex flex-col gap-[var(--gap-6)]">
        <StepSectionHeader number={2} title="이미지 스타일" />
        <ColorToneSelect value={colorTone} onChange={setColorTone} />
      </div>

      <div className="border-border-subtler border-t" />

      {/* 3. 출력 설정 */}
      <div className="flex flex-col gap-[var(--gap-6)]">
        <StepSectionHeader number={3} title="출력 설정" />

        {/* 섹션들 */}
        <div className="flex flex-col gap-[var(--gap-7)]">
          <PromptInput value={prompt} onChange={setPrompt} />
          <AspectRatioSelect value={aspectRatio} onChange={setAspectRatio} />
        </div>
      </div>

      <Button
        variant="primary"
        size="large"
        onClick={handleSubmit}
        className="w-full"
      >
        완료
      </Button>
    </div>
  );
};
