'use client';

import { useEffect } from 'react';
import { Tabs } from '@/components/commons/Tabs';
import { ModelShotContent } from '@/components/features/image/ModelShotContent';
import { ProductShotContent } from '@/components/features/image/ProductShotContent';
import { ImageGenerateEmptyCanvas } from '@/components/features/image/ImageGenerateEmptyCanvas';
import { ImageGenerateLoadingCanvas } from './ImageGenerateLoadingCanvas';
import { ImageGenerateResultCanvas } from './ImageGenerateResultCanvas';
import { useBrandMood } from '@/hooks/useBrandMood';

const IMAGE_TABS = [
  { label: '모델컷', content: <ModelShotContent /> },
  { label: '제품컷', content: <ProductShotContent /> },
];

export default function ImageGeneratePage() {
  // TODO: 임시 호출 예시. 실제 브랜드/무드 연동 후 제거
  const { data: brandMood } = useBrandMood(2, 6);

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
        {/* <ImageGenerateEmptyCanvas /> */}
        {/* <ImageGenerateLoadingCanvas /> */}
        <ImageGenerateResultCanvas
          aspectRatio="3:4"
          images={[
            {
              id: '1',
              url: 'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg',
            },
            {
              id: '2',
              url: 'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg',
            },
            {
              id: '3',
              url: 'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg',
            },
            {
              id: '4',
              url: 'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg',
            },
          ]}
        />
      </div>
    </div>
  );
}
