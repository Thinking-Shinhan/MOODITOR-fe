'use client';

import { DragEvent, useState } from 'react';
import { X } from 'lucide-react';
import { Body, Heading } from '@/components/commons/Typography';
import { SAVED_IMAGE_DRAG_TYPE } from '@/components/features/detail/templates/useImageSlotDrop';
import { useDetailPageInit } from '@/hooks/useDetailPageInit';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';

interface SavedImage {
  id: string;
  url: string;
}

interface ImagePlacementPanelProps {
  onClose: () => void;
}

export const ImagePlacementPanel = ({ onClose }: ImagePlacementPanelProps) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const { data, isLoading, isError } = useDetailPageInit(
    selectedProduct ? Number(selectedProduct.id) : null,
  );

  const visibleImages: SavedImage[] =
    data?.assets.map((asset) => ({
      id: String(asset.id),
      url: asset.fileUrl,
    })) ?? [];

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    image: SavedImage,
  ) => {
    event.dataTransfer.setData(SAVED_IMAGE_DRAG_TYPE, image.url);
    event.dataTransfer.effectAllowed = 'copy';
    setDraggingId(image.id);
  };

  return (
    <div className="border-border-subtler bg-bg-white flex w-[380px] shrink-0 flex-col gap-[var(--gap-8)] overflow-y-auto border-r p-[32px]">
      <div className="flex flex-col gap-[var(--gap-2)]">
        <div className="flex items-center justify-between">
          <Heading size="xsmall" className="text-text-basic">
            이미지 배치
          </Heading>
          <button
            type="button"
            onClick={onClose}
            className="flex size-[16px] cursor-pointer items-center justify-center"
          >
            <X size={16} className="text-icon-gray" />
          </button>
        </div>
        <Body size="xsmall" className="text-text-subtler">
          상세페이지 템플릿에 이미지를 배치해주세요.
        </Body>
      </div>
      <div className="flex flex-col gap-[var(--gap-4)]">
        <Body size="medium" bold className="text-text-subtle">
          저장된 이미지
        </Body>
        {isLoading && (
          <Body size="xsmall" className="text-text-subtler">
            이미지를 불러오는 중이에요.
          </Body>
        )}
        {isError && (
          <Body size="xsmall" className="text-icon-danger">
            이미지를 불러오지 못했어요.
          </Body>
        )}
        {!isLoading && !isError && visibleImages.length === 0 && (
          <Body size="xsmall" className="text-text-subtler">
            저장된 이미지가 없어요.
          </Body>
        )}
        <div className="columns-2 gap-[var(--gap-4)]">
          {visibleImages.map((image) => (
            <div
              key={image.id}
              draggable
              onDragStart={(event) => handleDragStart(event, image)}
              onDragEnd={() => setDraggingId(null)}
              className={`bg-bg-gray-subtle mb-[var(--gap-4)] block cursor-grab break-inside-avoid overflow-hidden rounded-[var(--radius-small1)] active:cursor-grabbing ${
                draggingId === image.id
                  ? 'border-border-basic border-[1.5px]'
                  : ''
              }`}
            >
              <img
                src={image.url}
                alt=""
                className="pointer-events-none block h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
