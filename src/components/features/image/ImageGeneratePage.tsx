'use client';

import { Tabs } from '@/components/commons/Tabs';

const ModelCutPlaceholder = () => (
  <div className="bg-bg-gray-subtle text-text-subtler mt-(--gap-9) flex h-64 items-center justify-center rounded-(--radius-large1) text-[14px]">
    모델컷 컨텐츠
  </div>
);

const ProductCutPlaceholder = () => (
  <div className="bg-bg-gray-subtle text-text-subtler mt-(--gap-9) flex h-64 items-center justify-center rounded-(--radius-large1) text-[14px]">
    제품컷 컨텐츠
  </div>
);

const IMAGE_TABS = [
  { label: '모델컷', content: <ModelCutPlaceholder /> },
  { label: '제품컷', content: <ProductCutPlaceholder /> },
];

export default function ImageGeneratePage() {
  return (
    <div className="flex h-full">
      {/* 컨트롤 패널 */}
      <div className="border-border-subtler bg-bg-white flex w-120 shrink-0 flex-col overflow-y-auto border-r px-9 py-7.75">
        <Tabs tabs={IMAGE_TABS} className="flex flex-col" />
      </div>

      {/* 캔버스 영역 */}
      <div className="bg-bg-gray-subtler flex flex-1 items-center justify-center">
        <span className="text-text-disabled text-[14px]">캔버스 영역</span>
      </div>
    </div>
  );
}
