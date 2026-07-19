'use client';

import dynamic from 'next/dynamic';
import { DetailEditHeader } from '@/components/features/detail/DetailEditHeader';
import { ImagePlacementPanel } from '@/components/features/detail/ImagePlacementPanel';
import { TemplateListPanel } from '@/components/features/detail/TemplateListPanel';
import { CopyReviewPanel } from '@/components/features/detail/CopyReviewPanel';
import { DetailCanvasZoomControl } from '@/components/features/detail/DetailCanvasZoomControl';
import { useImagePlacementStore } from '@/stores/imagePlacementStore';
import { useCopyReviewStore } from '@/stores/copyReviewStore';
import { useDetailCanvasZoomStore } from '@/stores/detailCanvasZoomStore';

const DetailEditCanvas = dynamic(
  () =>
    import('@/components/features/detail/DetailEditCanvas').then(
      (mod) => mod.DetailEditCanvas,
    ),
  { ssr: false },
);

export default function DetailEditPage() {
  const isImagePanelOpen = useImagePlacementStore((state) => state.isPanelOpen);
  const closeImagePanel = useImagePlacementStore((state) => state.closePanel);
  const isCopyReviewPanelOpen = useCopyReviewStore(
    (state) => state.isPanelOpen,
  );
  const closeCopyReviewPanel = useCopyReviewStore((state) => state.closePanel);
  const isCopyReviewLoading = useCopyReviewStore((state) => state.isLoading);
  const copyReviewItems = useCopyReviewStore((state) => state.items);
  const applyCopyReviewItem = useCopyReviewStore((state) => state.applyItem);
  const applyAllCopyReviewItems = useCopyReviewStore((state) => state.applyAll);
  const focusCopyReviewInstance = useCopyReviewStore(
    (state) => state.focusInstance,
  );

  const handleFocusCopyReviewItem = (id: string) => {
    const item = copyReviewItems.find((item) => item.id === id);
    if (item) focusCopyReviewInstance(item.instanceKey);
  };

  const zoom = useDetailCanvasZoomStore((state) => state.zoom);

  return (
    <div className="flex h-full">
      {isCopyReviewPanelOpen ? (
        <CopyReviewPanel
          items={copyReviewItems}
          isLoading={isCopyReviewLoading}
          onApply={applyCopyReviewItem}
          onApplyAll={applyAllCopyReviewItems}
          onClose={closeCopyReviewPanel}
          onFocusItem={handleFocusCopyReviewItem}
          applyAllDisabled={copyReviewItems.every(
            (item) => item.status === 'applied',
          )}
        />
      ) : isImagePanelOpen ? (
        <ImagePlacementPanel onClose={closeImagePanel} />
      ) : (
        <TemplateListPanel />
      )}
      <div className="relative flex flex-1 flex-col">
        <div className="bg-bg-gray-subtler flex flex-1 transform-gpu flex-col overflow-auto">
          <DetailEditHeader className="sticky top-0 z-10 shrink-0" />
          <div className="flex flex-1 flex-col items-center px-[60px] pt-[var(--gap-9)]">
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
            >
              <DetailEditCanvas />
            </div>
            <div className="h-[240px] w-full shrink-0" />
          </div>
        </div>
        <DetailCanvasZoomControl className="absolute right-[var(--gap-7)] bottom-[var(--gap-7)]" />
      </div>
    </div>
  );
}
