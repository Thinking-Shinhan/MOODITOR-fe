'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductSelect } from '@/components/features/image/ProductSelect';
import { ImageSelectSection } from '@/components/features/image/ImageSelectSection';
import { ColorToneSelect } from '@/components/features/image/ColorToneSelect';
import { AspectRatioSelect } from '@/components/features/image/AspectRatioSelect';
import { PromptInput } from '@/components/features/image/PromptInput';
import { StepSectionHeader } from '@/components/commons/StepSectionHeader';
import { Body } from '@/components/commons/Typography';
import { OptionButton } from '@/components/commons/OptionButton';
import { Button } from '@/components/commons/Button';
import { InputMessage } from '@/components/commons/InputMessage';
import { ProgressStepModal } from '@/components/commons/ProgressStepModal';
import { useProductSelectionStore } from '@/stores/productSelectionStore';
import { useReferenceAssets } from '@/hooks/useReferenceAssets';
import { useCreateImageGenerationJob } from '@/hooks/useCreateImageGenerationJob';
import { useImageGenerationPolling } from '@/hooks/useImageGenerationPolling';
import { useModelCutResultStore } from '@/stores/imageGenerationResultStore';
import { ApiError } from '@/libs/apiClient';
import {
  COLOR_TEMPERATURE_MAP,
  CAMERA_ANGLE_MAP,
  FRAMING_MAP,
  REQUEST_ASPECT_RATIO_MAP,
  SUCCESS_HOLD_DURATION_MS,
} from '@/constants/image-generation';
import type { SelectedProduct } from '@/types/product';
import type { ImageAspectRatio } from '@/types/image';
import type {
  CreateImageGenerationJobRequest,
  OutfitItem,
} from '@/types/imageGenerationJob';

interface ModelShotFormData {
  products: SelectedProduct[];
  modelReferenceAssetId: number | null;
  backgroundReferenceAssetId: number | null;
  poseReferenceAssetId: number | null;
  colorTone: string | null;
  cameraAngle: string | null;
  composition: string | null;
  prompt: string;
  aspectRatio: string | null;
}

// 모델컷은 항상 4장을 요청한다
const MODEL_CUT_REQUESTED_COUNT = 4;

const CAMERA_ANGLE_OPTIONS = ['정면', '좌측 사선', '우측 사선', '후면'];
const COMPOSITION_OPTIONS = [
  '전신',
  '3/4 전신',
  '반신',
  '클로즈업',
  '여백 강조',
];

export const ModelShotContent = () => {
  const router = useRouter();

  const selectedProducts = useProductSelectionStore(
    (state) => state.selectedProducts,
  );
  const removeProduct = useProductSelectionStore(
    (state) => state.removeProduct,
  );

  const [colorTone, setColorTone] = useState<string | null>(null);
  const [cameraAngle, setCameraAngle] = useState<string | null>(null);
  const [composition, setComposition] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

  const [modelReferenceAssetId, setModelReferenceAssetId] = useState<
    number | null
  >(null);
  const [backgroundReferenceAssetId, setBackgroundReferenceAssetId] = useState<
    number | null
  >(null);
  const [poseReferenceAssetId, setPoseReferenceAssetId] = useState<
    number | null
  >(null);

  const { data: modelAssets } = useReferenceAssets('MODEL');
  const { data: backgroundAssets } = useReferenceAssets('BACKGROUND');
  const { data: poseAssets } = useReferenceAssets('POSE');

  const modelImages =
    modelAssets?.referenceAssets.map((asset) => ({
      id: String(asset.referenceAssetId),
      url: asset.imageUrl,
    })) ?? [];
  const backgroundImages =
    backgroundAssets?.referenceAssets.map((asset) => ({
      id: String(asset.referenceAssetId),
      url: asset.imageUrl,
    })) ?? [];
  const poseImages =
    poseAssets?.referenceAssets.map((asset) => ({
      id: String(asset.referenceAssetId),
      url: asset.imageUrl,
    })) ?? [];

  const formData = useMemo<ModelShotFormData>(
    () => ({
      products: selectedProducts,
      modelReferenceAssetId,
      backgroundReferenceAssetId,
      poseReferenceAssetId,
      colorTone,
      cameraAngle,
      composition,
      prompt,
      aspectRatio,
    }),
    [
      selectedProducts,
      modelReferenceAssetId,
      backgroundReferenceAssetId,
      poseReferenceAssetId,
      colorTone,
      cameraAngle,
      composition,
      prompt,
      aspectRatio,
    ],
  );

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const showProductError = submitAttempted && selectedProducts.length === 0;
  const showModelError = submitAttempted && modelReferenceAssetId === null;

  const productSectionRef = useRef<HTMLDivElement>(null);
  const modelSectionRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: createJob, isPending: isGenerating } =
    useCreateImageGenerationJob();
  const startGenerating = useModelCutResultStore(
    (state) => state.startGenerating,
  );
  const setGenerationResult = useModelCutResultStore(
    (state) => state.setResult,
  );
  const resetGenerationResult = useModelCutResultStore((state) => state.reset);
  const generationStatus = useModelCutResultStore((state) => state.status);

  // 생성 완료(100%) 화면을 잠깐 보여준 뒤 결과 화면으로 넘어가기 위한 타이머
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const { job, startPolling } = useImageGenerationPolling({
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
        setGenerationResult(images, (aspectRatio as ImageAspectRatio) ?? '3:4');
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
    if (modelReferenceAssetId === null) {
      modelSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    setSubmitError(null);
    startGenerating();

    const outfitItems: OutfitItem[] = selectedProducts.map(
      (product, index) => ({
        role: index === 0 ? 'PRIMARY' : 'STYLING',
        productId: Number(product.id),
        assetIds: product.assetIds,
      }),
    );

    const request: CreateImageGenerationJobRequest = {
      productId: Number(selectedProducts[0].id),
      cutType: 'MODEL_CUT',
      generationMode: 'PARALLEL',
      requestedCount: MODEL_CUT_REQUESTED_COUNT,
      // 프롬프트가 공백이면 요청이 거부되어, 미입력 시 공백 문자 하나를 대신 보낸다
      prompt: prompt.trim().length > 0 ? prompt : '_',
      userOptionsJson: {
        colorTemperature: colorTone ? COLOR_TEMPERATURE_MAP[colorTone] : null,
        cameraAngle: cameraAngle ? CAMERA_ANGLE_MAP[cameraAngle] : null,
        framing: composition ? FRAMING_MAP[composition] : null,
        aspectRatio: aspectRatio ? REQUEST_ASPECT_RATIO_MAP[aspectRatio] : null,
      },
      referenceJson: {
        outfitItems,
        modelReferenceId: modelReferenceAssetId,
        poseReferenceId: poseReferenceAssetId,
        backgroundReferenceId: backgroundReferenceAssetId,
      },
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
    router.push('/products?shotType=model');
  };

  const handleAddMore = () => {
    router.push('/products?shotType=model');
  };

  const handleSelectModel = (id: string | null) => {
    setModelReferenceAssetId(id ? Number(id) : null);
  };

  const handleSelectBackground = (id: string | null) => {
    setBackgroundReferenceAssetId(id ? Number(id) : null);
  };

  const handleSelectPose = (id: string | null) => {
    setPoseReferenceAssetId(id ? Number(id) : null);
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
              showError={showProductError}
              onClickSelectArea={handleSelectArea}
              onRemoveProduct={removeProduct}
              onAddMore={handleAddMore}
            />
          </div>
          <div ref={modelSectionRef}>
            <ImageSelectSection
              label="모델 선택"
              errorMessage="모델을 선택해 주세요."
              showError={showModelError}
              onSelect={handleSelectModel}
              segments={[
                { label: '추천 모델', images: modelImages },
                {
                  label: '내 모델',
                  showUpload: true,
                  warningMessage: '누끼컷을 업로드하면 정확도가 높아져요.',
                },
              ]}
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

          {/* 포즈 선택 */}
          <ImageSelectSection
            label="포즈 선택"
            images={poseImages}
            onSelect={handleSelectPose}
          />
        </div>
      </div>

      <div className="border-border-subtler border-t" />

      {/* 2. 이미지 스타일 */}
      <div className="flex flex-col gap-[var(--gap-6)]">
        <StepSectionHeader number={2} title="이미지 스타일" />

        {/* 섹션들 */}
        <div className="flex flex-col gap-[var(--gap-8)]">
          <ColorToneSelect value={colorTone} onChange={setColorTone} />
          {/* 카메라 각도 */}
          <div className="flex flex-col gap-[var(--gap-4)]">
            <Body size="medium" bold className="text-text-subtle">
              카메라 각도
            </Body>
            <div className="grid grid-cols-2 gap-[var(--gap-4)]">
              {CAMERA_ANGLE_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  selected={cameraAngle === option}
                  onClick={() => setCameraAngle(option)}
                  className="w-full"
                >
                  {option}
                </OptionButton>
              ))}
            </div>
          </div>
          {/* 구도 */}
          <div className="flex flex-col gap-[var(--gap-4)]">
            <Body size="medium" bold className="text-text-subtle">
              구도
            </Body>
            <div className="grid grid-cols-3 gap-[var(--gap-4)]">
              {COMPOSITION_OPTIONS.map((option) => (
                <OptionButton
                  key={option}
                  selected={composition === option}
                  onClick={() => setComposition(option)}
                  className="w-full"
                >
                  {option}
                </OptionButton>
              ))}
            </div>
          </div>
        </div>
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
        items={(job?.progressItems ?? []).map((item) => ({
          label: `이미지 ${item.outputIndex + 1}장 생성 완료`,
          active: item.status === 'SUCCEEDED',
        }))}
      />
    </div>
  );
};
