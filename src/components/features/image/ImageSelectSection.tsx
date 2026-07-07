'use client';

import { useState } from 'react';
import { SegmentControl } from '@/components/commons/SegmentControl';
import { ImageCard } from '@/components/features/image/ImageCard';
import { InputMessage } from '@/components/commons/InputMessage';
import { Body } from '@/components/commons/Typography';

const GRID_SIZE = 8;

type ImageItem = { id: string; url: string };

type SlotItem =
  | { type: 'upload'; id: string }
  | { type: 'image'; id: string; url: string }
  | { type: 'placeholder'; id: string };

type ImageSectionSegment = {
  label: string;
  images?: ImageItem[];
  showUpload?: boolean;
  onUpload?: () => void;
  warningMessage?: string;
};

interface ImageGridProps {
  images?: ImageItem[];
  showUpload?: boolean;
  onUpload?: () => void;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

const ImageGrid = ({
  images = [],
  showUpload = false,
  onUpload,
  selectedId,
  onSelect,
}: ImageGridProps) => {
  const slots: SlotItem[] = Array.from({ length: GRID_SIZE }, (_, i) => {
    if (showUpload && i === 0) return { type: 'upload', id: 'upload' };
    const imgIndex = showUpload ? i - 1 : i;
    const img = images[imgIndex];
    if (img) return { type: 'image', ...img };
    return { type: 'placeholder', id: `placeholder-${i}` };
  });

  return (
    <div className="grid h-68 w-full grid-cols-4 grid-rows-2 gap-3">
      {slots.map((slot) => (
        <ImageCard
          key={slot.id}
          isUpload={slot.type === 'upload'}
          imageUrl={slot.type === 'image' ? slot.url : undefined}
          selected={slot.type === 'image' && slot.id === selectedId}
          onClick={
            slot.type === 'upload'
              ? onUpload
              : slot.type === 'image'
                ? () => onSelect?.(slot.id)
                : undefined
          }
        />
      ))}
    </div>
  );
};

interface ImageSelectSectionProps {
  label: string;
  showError?: boolean;
  errorMessage?: string;
  // 세그먼트 있는 경우 (모델 선택, 배경 선택)
  segments?: ImageSectionSegment[];
  // 세그먼트 없는 경우 (포즈 선택)
  images?: ImageItem[];
  showUpload?: boolean;
  onUpload?: () => void;
  warningMessage?: string;
  // 선택 변경 시 부모에 알림 (선택 해제 시 null)
  onSelect?: (id: string | null) => void;
}

export const ImageSelectSection = ({
  label,
  showError = false,
  errorMessage,
  segments,
  images = [],
  showUpload = false,
  onUpload,
  warningMessage,
  onSelect,
}: ImageSelectSectionProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    const next = selectedId === id ? null : id;
    setSelectedId(next);
    onSelect?.(next);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <Body size="medium" bold className="text-text-subtle">
          {label}
        </Body>
        {showError && errorMessage && (
          <InputMessage state="error" message={errorMessage} />
        )}
      </div>

      {segments && segments.length > 0 ? (
        /* 세그먼트 있는 경우: SegmentControl에 그리드를 content로 주입 */
        <SegmentControl
          segments={segments.map((seg) => ({
            label: seg.label,
            content: (
              <div className="mt-4 flex flex-col gap-4">
                <ImageGrid
                  images={seg.images}
                  showUpload={seg.showUpload}
                  onUpload={seg.onUpload}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                />
                {seg.warningMessage && (
                  <InputMessage
                    state="warning"
                    message={seg.warningMessage}
                    className="self-end"
                  />
                )}
              </div>
            ),
          }))}
        />
      ) : (
        /* 세그먼트 없는 경우 (포즈 선택 등) */
        <div className="flex flex-col gap-4">
          <ImageGrid
            images={images}
            showUpload={showUpload}
            onUpload={onUpload}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
          {warningMessage && (
            <InputMessage
              state="warning"
              message={warningMessage}
              className="self-end"
            />
          )}
        </div>
      )}
    </div>
  );
};
