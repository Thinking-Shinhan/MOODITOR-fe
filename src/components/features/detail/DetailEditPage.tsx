'use client';

import dynamic from 'next/dynamic';
import { DetailEditHeader } from '@/components/features/detail/DetailEditHeader';
import { ImagePlacementPanel } from '@/components/features/detail/ImagePlacementPanel';
import { TemplateListPanel } from '@/components/features/detail/TemplateListPanel';
import { useImagePlacementStore } from '@/stores/imagePlacementStore';

const DetailEditCanvas = dynamic(
  () =>
    import('@/components/features/detail/DetailEditCanvas').then(
      (mod) => mod.DetailEditCanvas,
    ),
  { ssr: false },
);

export default function DetailEditPage() {
  const activeSlot = useImagePlacementStore((state) => state.activeSlot);
  const closeSlot = useImagePlacementStore((state) => state.closeSlot);
  const setImage = useImagePlacementStore((state) => state.setImage);

  return (
    <div className="flex h-full">
      {activeSlot ? (
        <ImagePlacementPanel
          onClose={closeSlot}
          onSelectImage={(image) => {
            setImage(activeSlot.templateId, activeSlot.slotId, image.url);
            closeSlot();
          }}
        />
      ) : (
        <TemplateListPanel />
      )}
      <div className="bg-bg-gray-subtler flex flex-1 flex-col overflow-auto">
        <DetailEditHeader className="sticky top-0 z-10 shrink-0" />
        <div className="flex flex-1 flex-col items-center px-[60px] pt-[var(--gap-9)]">
          <DetailEditCanvas />
          <div className="h-[240px] w-full shrink-0" />
        </div>
      </div>
    </div>
  );
}
