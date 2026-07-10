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
import { useProductSelectionStore } from '@/stores/productSelectionStore';
import { useReferenceAssets } from '@/hooks/useReferenceAssets';
import type { SelectedProduct } from '@/types/product';

// 임시 폼 구조
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

  // TODO: 폼 데이터 상태를 확인하기 위한 임시 useEffect, 실제 구현 시 제거
  useEffect(() => {
    console.log('모델컷 생성 폼 데이터:', formData);
  }, [formData]);

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const showProductError = submitAttempted && selectedProducts.length === 0;
  const showModelError = submitAttempted && modelReferenceAssetId === null;

  const productSectionRef = useRef<HTMLDivElement>(null);
  const modelSectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
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
    // TODO: 완료 동작(제출/API 연동)은 스펙 확정 후 구현
  };

  const handleSelectArea = () => {
    router.push('/products');
  };

  const handleAddMore = () => {
    router.push('/products');
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
