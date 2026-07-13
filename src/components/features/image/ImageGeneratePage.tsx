'use client';

import { Tabs } from '@/components/commons/Tabs';
import { ModelShotContent } from '@/components/features/image/ModelShotContent';
import { ProductShotContent } from '@/components/features/image/ProductShotContent';
import { ImageGenerateEmptyCanvas } from '@/components/features/image/ImageGenerateEmptyCanvas';
import { ImageGenerateLoadingCanvas } from '@/components/features/image/ImageGenerateLoadingCanvas';
import { ImageGenerateResultCanvas } from '@/components/features/image/ImageGenerateResultCanvas';
import {
  useModelCutResultStore,
  useProductCutResultStore,
} from '@/stores/imageGenerationResultStore';
import { useImageGenerateTabStore } from '@/stores/imageGenerateTabStore';

const IMAGE_TABS = [
  { label: '모델컷', content: <ModelShotContent /> },
  { label: '제품컷', content: <ProductShotContent /> },
];

// IMAGE_TABS에서 제품컷 탭의 인덱스. 모델컷/제품컷은 각자 독립된 캔버스 상태를 가지므로
// 현재 활성 탭에 맞는 스토어를 골라 캔버스에 반영해야 한다.
const PRODUCT_TAB_INDEX = 1;

export default function ImageGeneratePage() {
  const modelCutResult = useModelCutResultStore();
  const productCutResult = useProductCutResultStore();

  const activeTabIndex = useImageGenerateTabStore(
    (state) => state.activeTabIndex,
  );
  const setActiveTabIndex = useImageGenerateTabStore(
    (state) => state.setActiveTabIndex,
  );

  const { status, images, aspectRatio } =
    activeTabIndex === PRODUCT_TAB_INDEX ? productCutResult : modelCutResult;

  return (
    <div className="flex h-full">
      {/* 컨트롤 패널 */}
      <div className="border-border-subtler bg-bg-white flex w-123 shrink-0 flex-col overflow-y-auto border-r px-9 py-7.75">
        <Tabs
          tabs={IMAGE_TABS}
          defaultIndex={activeTabIndex}
          onTabChange={setActiveTabIndex}
        />
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
