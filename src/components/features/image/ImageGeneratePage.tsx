'use client';

import { Tabs } from '@/components/commons/Tabs';
import { ModelShotContent } from '@/components/features/image/ModelShotContent';
import { ProductShotContent } from '@/components/features/image/ProductShotContent';
import { ImageGenerateEmptyCanvas } from '@/components/features/image/ImageGenerateEmptyCanvas';
import { ImageGenerateLoadingCanvas } from './ImageGenerateLoadingCanvas';
import { ImageGenerateResultCanvas } from './ImageGenerateResultCanvas';

const IMAGE_TABS = [
  { label: '모델컷', content: <ModelShotContent /> },
  { label: '제품컷', content: <ProductShotContent /> },
];

export default function ImageGeneratePage() {
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
          images={[
            'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg',
            'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg',
            'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg',
            'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg',
          ]}
        />
      </div>
    </div>
  );
}
