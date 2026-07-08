'use client';

import { Tabs } from '@/components/commons/Tabs';
import { ModelShotContent } from '@/components/features/image/ModelShotContent';
import { ProductShotContent } from '@/components/features/image/ProductShotContent';

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
        <span className="text-text-disabled text-[14px]">캔버스 영역</span>
      </div>
    </div>
  );
}
