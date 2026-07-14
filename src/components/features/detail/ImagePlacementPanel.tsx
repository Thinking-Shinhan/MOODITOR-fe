'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Dropdown } from '@/components/commons/Dropdown';
import { Body, Heading } from '@/components/commons/Typography';

interface SavedImage {
  id: string;
  category: string;
  url: string;
}

const createMockImageUrl = (color: string, label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="142" height="200"><rect width="142" height="200" fill="${color}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#ffffff">${label}</text></svg>`,
  )}`;

// TODO: 실제 저장된 이미지 목록 API 연동 후 목업 데이터 제거
const MOCK_SAVED_IMAGES: SavedImage[] = [
  {
    id: 'saved-1',
    category: '모델컷 이미지',
    url: createMockImageUrl('#FF9B61', '모델 1'),
  },
  {
    id: 'saved-2',
    category: '모델컷 이미지',
    url: createMockImageUrl('#FFBD96', '모델 2'),
  },
  {
    id: 'saved-3',
    category: '제품컷 이미지',
    url: createMockImageUrl('#5FB5F7', '제품 1'),
  },
  {
    id: 'saved-4',
    category: '제품컷 이미지',
    url: createMockImageUrl('#9ED2FA', '제품 2'),
  },
  {
    id: 'saved-5',
    category: '모델컷 이미지',
    url: createMockImageUrl('#F48771', '모델 3'),
  },
  {
    id: 'saved-6',
    category: '제품컷 이미지',
    url: createMockImageUrl('#2098F3', '제품 3'),
  },
  {
    id: 'saved-7',
    category: '모델컷 이미지',
    url: createMockImageUrl('#FF6D18', '모델 4'),
  },
  {
    id: 'saved-8',
    category: '제품컷 이미지',
    url: createMockImageUrl('#0B78CB', '제품 4'),
  },
];

const CATEGORY_OPTIONS = Array.from(
  new Set(MOCK_SAVED_IMAGES.map((image) => image.category)),
).map((category) => ({ label: category, value: category }));

interface ImagePlacementPanelProps {
  onClose: () => void;
  onSelectImage: (image: SavedImage) => void;
}

export const ImagePlacementPanel = ({
  onClose,
  onSelectImage,
}: ImagePlacementPanelProps) => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visibleImages = categoryFilter
    ? MOCK_SAVED_IMAGES.filter((image) => image.category === categoryFilter)
    : MOCK_SAVED_IMAGES;

  const handleSelect = (image: SavedImage) => {
    setSelectedId(image.id);
    onSelectImage(image);
  };

  return (
    <div className="border-border-subtler bg-bg-white flex w-[364px] shrink-0 flex-col gap-[var(--gap-8)] overflow-y-auto border-r p-[32px]">
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
          options={CATEGORY_OPTIONS}
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
        <div className="flex w-full flex-wrap gap-[var(--gap-4)]">
          {visibleImages.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => handleSelect(image)}
              className={`bg-bg-gray-subtle relative h-[200px] w-[142px] shrink-0 cursor-pointer overflow-hidden rounded-[var(--radius-small1)] ${
                selectedId === image.id
                  ? 'border-border-basic border-[1.5px]'
                  : ''
              }`}
            >
              <img
                src={image.url}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
