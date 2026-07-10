'use client';

import { useEffect } from 'react';
import { Tabs } from '@/components/commons/Tabs';
import { ModelShotContent } from '@/components/features/image/ModelShotContent';
import { ProductShotContent } from '@/components/features/image/ProductShotContent';
import { ImageGenerateEmptyCanvas } from '@/components/features/image/ImageGenerateEmptyCanvas';
import { ImageGenerateLoadingCanvas } from '@/components/features/image/ImageGenerateLoadingCanvas';
import { ImageGenerateResultCanvas } from '@/components/features/image/ImageGenerateResultCanvas';
import { useImageGenerationResultStore } from '@/stores/imageGenerationResultStore';
import { useCurrentBrandMood } from '@/hooks/useCurrentBrandMood';

const IMAGE_TABS = [
  { label: '모델컷', content: <ModelShotContent /> },
  { label: '제품컷', content: <ProductShotContent /> },
];

export default function ImageGeneratePage() {
  const status = useImageGenerationResultStore((state) => state.status);
  const images = useImageGenerationResultStore((state) => state.images);
  const aspectRatio = useImageGenerationResultStore(
    (state) => state.aspectRatio,
  );

  // TODO: 임시 호출 예시. 실제 브랜드/무드 연동 후 제거
  const { data: brandMood } = useCurrentBrandMood();

  useEffect(() => {
    console.log('브랜드 무드 조회 결과:', brandMood);
  }, [brandMood]);

  return (
    <div className="flex h-full">
      {/* 컨트롤 패널 */}
      <div className="border-border-subtler bg-bg-white flex w-123 shrink-0 flex-col overflow-y-auto border-r px-9 py-7.75">
        <Tabs tabs={IMAGE_TABS} />
      </div>

      {/* 캔버스 영역 */}
      <div className="bg-bg-gray-subtler flex flex-1 items-center justify-center">
        {status === 'loading' && <ImageGenerateLoadingCanvas />}
        {status === 'success' && (
          <ImageGenerateResultCanvas
            images={images}
            aspectRatio={aspectRatio}
          />
        )}
        {status === 'idle' && <ImageGenerateEmptyCanvas />}
      </div>
    </div>
  );
}
