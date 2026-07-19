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
import { InputMessage } from '@/components/commons/InputMessage';
import { ProgressStepModal } from '@/components/commons/ProgressStepModal';
import { useProductSelectionStore } from '@/stores/productSelectionStore';
import { useReferenceAssets } from '@/hooks/useReferenceAssets';
import { useCreateImageGenerationJob } from '@/hooks/useCreateImageGenerationJob';
import { useImageGenerationPolling } from '@/hooks/useImageGenerationPolling';
import { useProductCutResultStore } from '@/stores/imageGenerationResultStore';
import { ApiError } from '@/libs/apiClient';
import { buildProgressChecklistItems } from '@/utils/imageGeneration';
import {
  COLOR_TEMPERATURE_MAP,
  REQUEST_ASPECT_RATIO_MAP,
  SUCCESS_HOLD_DURATION_MS,
} from '@/constants/image-generation';
import type { SelectedProduct } from '@/types/product';
import type { ImageAspectRatio } from '@/types/image';
import type {
  CreateImageGenerationJobRequest,
  ProductCutReference,
} from '@/types/imageGenerationJob';

// 제품컷은 상품을 하나만 선택할 수 있음
const MAX_SELECTED_PRODUCTS = 1;

// 임시 폼 구조
interface ProductShotFormData {
  products: SelectedProduct[];
  compositionReferenceAssetIds: number[];
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

  const [compositionReferenceAssetIds, setCompositionReferenceAssetIds] =
    useState<number[]>([]);
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

  // 실측가이드 구도를 선택하면 배경/색온도/프롬프트를 막고 비율을 1:1로 고정한다
  // (label은 한글 자유 텍스트라 key로 매칭 — REF_PRODUCT_TEMPLATE_MEASUREMENT_GUIDE / REF_ACCESSORY_TEMPLATE_MEASUREMENT_GUIDE)
  const { data: shotTemplateAssets } = useReferenceAssets('SHOT_TEMPLATE');
  const isMeasurementGuideSelected =
    shotTemplateAssets?.referenceAssets.some(
      (asset) =>
        asset.key.endsWith('_MEASUREMENT_GUIDE') &&
        compositionReferenceAssetIds.includes(asset.referenceAssetId),
    ) ?? false;

  // 실측가이드 선택 시에는 사용자가 고른 값과 무관하게 1:1로 고정해서 보여준다
  const effectiveAspectRatio = isMeasurementGuideSelected ? '1:1' : aspectRatio;

  const formData = useMemo<ProductShotFormData>(
    () => ({
      products: selectedProducts,
      compositionReferenceAssetIds,
      backgroundReferenceAssetId,
      colorTone,
      prompt,
      aspectRatio,
    }),
    [
      selectedProducts,
      compositionReferenceAssetIds,
      backgroundReferenceAssetId,
      colorTone,
      prompt,
      aspectRatio,
    ],
  );

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const showProductError = submitAttempted && selectedProducts.length === 0;
  const showCompositionError =
    submitAttempted && compositionReferenceAssetIds.length === 0;

  const productSectionRef = useRef<HTMLDivElement>(null);
  const compositionSectionRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: createJob, isPending: isGenerating } =
    useCreateImageGenerationJob();
  const startGenerating = useProductCutResultStore(
    (state) => state.startGenerating,
  );
  const setGenerationResult = useProductCutResultStore(
    (state) => state.setResult,
  );
  const resetGenerationResult = useProductCutResultStore(
    (state) => state.reset,
  );
  const generationStatus = useProductCutResultStore((state) => state.status);

  // 생성 완료(100%) 화면을 잠깐 보여준 뒤 결과 화면으로 넘어가기 위한 타이머
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const {
    job,
    startPolling,
    reset: resetPolling,
  } = useImageGenerationPolling({
    onSucceeded: (succeededJob) => {
      const images = succeededJob.results
        .filter(
          (result): result is typeof result & { imageUrl: string } =>
            !!result.imageUrl,
        )
        .map((result) => ({
          assetId: result.assetId,
          url: result.imageUrl,
        }));
      successTimeoutRef.current = setTimeout(() => {
        setGenerationResult(
          images,
          (effectiveAspectRatio as ImageAspectRatio) ?? '3:4',
        );
      }, SUCCESS_HOLD_DURATION_MS);
    },
    onFailed: (failedJob) => {
      resetGenerationResult();
      setSubmitError(failedJob.errorMessage ?? '이미지 생성에 실패했습니다.');
    },
  });

  const handleSubmit = async () => {
    setSubmitAttempted(true);

    if (selectedProducts.length === 0) {
      productSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }
    if (compositionReferenceAssetIds.length === 0) {
      compositionSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    setSubmitError(null);
    resetPolling();
    startGenerating();

    const referenceJson: ProductCutReference = {
      productImages: selectedProducts[0].assetIds,
      backgroundReferenceId: backgroundReferenceAssetId,
      shotReferenceIds: compositionReferenceAssetIds,
    };

    const request: CreateImageGenerationJobRequest = {
      productId: Number(selectedProducts[0].id),
      cutType: 'PRODUCT_CUT',
      generationMode: 'PARALLEL',
      requestedCount: compositionReferenceAssetIds.length,
      prompt: prompt.trim().length > 0 ? prompt.trim() : '_',
      userOptionsJson: {
        colorTemperature: colorTone ? COLOR_TEMPERATURE_MAP[colorTone] : null,
        aspectRatio: effectiveAspectRatio
          ? REQUEST_ASPECT_RATIO_MAP[effectiveAspectRatio]
          : null,
      },
      referenceJson,
    };

    try {
      const job = await createJob(request);
      startPolling(job);
    } catch (error) {
      resetGenerationResult();
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : '이미지 생성에 실패했습니다.',
      );
    }
  };

  const handleSelectArea = () => {
    router.push('/products?shotType=product');
  };

  const handleSelectBackground = (id: string | null) => {
    setBackgroundReferenceAssetId(id ? Number(id) : null);
  };

  const handleSelectComposition = (ids: string[]) => {
    setCompositionReferenceAssetIds(ids.map(Number));
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
            disabled={isMeasurementGuideSelected}
          />
        </div>
      </div>

      <div className="border-border-subtler border-t" />

      {/* 2. 이미지 스타일 */}
      <div className="flex flex-col gap-[var(--gap-6)]">
        <StepSectionHeader number={2} title="이미지 스타일" />
        <ColorToneSelect
          value={colorTone}
          onChange={setColorTone}
          disabled={isMeasurementGuideSelected}
        />
      </div>

      <div className="border-border-subtler border-t" />

      {/* 3. 출력 설정 */}
      <div className="flex flex-col gap-[var(--gap-6)]">
        <StepSectionHeader number={3} title="출력 설정" />

        {/* 섹션들 */}
        <div className="flex flex-col gap-[var(--gap-7)]">
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            disabled={isMeasurementGuideSelected}
          />
          <AspectRatioSelect
            value={effectiveAspectRatio}
            onChange={setAspectRatio}
            disabled={isMeasurementGuideSelected}
          />
        </div>
      </div>

      {submitError && <InputMessage state="error" message={submitError} />}

      <Button
        variant="primary"
        size="large"
        onClick={handleSubmit}
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? '생성 중...' : '완료'}
      </Button>

      <ProgressStepModal
        open={generationStatus === 'loading'}
        progress={job?.progressPercent ?? 0}
        title="이미지 생성 중"
        description={job?.progressMessage ?? ''}
        items={buildProgressChecklistItems(
          job?.progressItems ?? [],
          compositionReferenceAssetIds.length,
        )}
      />
    </div>
  );
};
