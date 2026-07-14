'use client';

import { DragEvent, useState } from 'react';
import { X } from 'lucide-react';
import { Dropdown } from '@/components/commons/Dropdown';
import { Body, Heading } from '@/components/commons/Typography';
import { SAVED_IMAGE_DRAG_TYPE } from '@/components/features/detail/templates/useImageSlotDrop';
import { useImageFolderAssets } from '@/hooks/useImageFolderAssets';

// TODO: 상품 선택 기능이 생기면 상위에서 실제 상품 ID를 받도록 변경
const TEMP_PRODUCT_ID = 14;

const MODEL_SHOT_CATEGORY = '모델컷 이미지';
const PRODUCT_SHOT_CATEGORY = '제품컷 이미지';

const MODEL_SHOT_ROLES = new Set([
  'FULL_BODY',
  'THREE_QUARTER_BODY',
  'HALF_BODY',
  'CLOSE_UP',
  'WIDE_MARGIN',
  'GENERATED_IMAGE',
]);

const getImageCategory = (assetRole: string) =>
  MODEL_SHOT_ROLES.has(assetRole) ? MODEL_SHOT_CATEGORY : PRODUCT_SHOT_CATEGORY;

interface SavedImage {
  id: string;
  category: string;
  url: string;
}

interface ImagePlacementPanelProps {
  onClose: () => void;
}

export const ImagePlacementPanel = ({ onClose }: ImagePlacementPanelProps) => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useImageFolderAssets(TEMP_PRODUCT_ID);

  const savedImages: SavedImage[] =
    data?.assets.map((asset) => ({
      id: String(asset.assetId),
      category: getImageCategory(asset.assetRole),
      url: asset.imageUrl,
    })) ?? [];

  const categoryOptions = Array.from(
    new Set(savedImages.map((image) => image.category)),
  ).map((category) => ({ label: category, value: category }));

  const visibleImages = categoryFilter
    ? savedImages.filter((image) => image.category === categoryFilter)
    : savedImages;

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
      <div className="flex flex-col gap-[var(--gap-5)]">
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
        <Dropdown
          label={categoryFilter ?? '모든 이미지'}
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
          className="w-full"
          panelWidthClassName="w-full"
          panelGapClassName="mt-[var(--gap-3)]"
          triggerClassName="bg-btn-tertiary-fill w-full justify-between rounded-[var(--radius-xsmall2)] px-[var(--padding-4)] py-[var(--size-height-2)]"
          labelClassName="text-text-subtler"
          labelBold
        />
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
