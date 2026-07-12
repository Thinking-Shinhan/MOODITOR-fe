'use client';

import { DragEvent, ReactNode } from 'react';
import type { DetailTemplateType } from '@/types/template';
import { ImagePlusIcon } from 'lucide-react';

interface TemplateThumbnailCardProps {
  type: DetailTemplateType;
  label: string;
  draggable?: boolean;
  onDragStart?: (event: DragEvent<HTMLDivElement>) => void;
}

// 이미지 슬롯: 실제 이미지가 들어갈 자리를 나타내는 흰색 박스 placeholder
const ImageSlot = ({ className = '' }: { className?: string }) => (
  <div
    className={`bg-bg-white flex shrink-0 items-center justify-center rounded-[var(--radius-medium2)] text-[var(--color-icon-disabled)] ${className}`}
  >
    <ImagePlusIcon className="h-8 w-8" />
  </div>
);

// 텍스트 줄 placeholder
const Bar = ({ className = '' }: { className?: string }) => (
  <div className={`shrink-0 bg-[var(--color-bg-gray-subtle)] ${className}`} />
);

// 텍스트/소재/사이즈 템플릿의 콘텐츠를 감싸는 흰색 내부 카드
// padding 유틸 클래스를 className으로 덮어쓰면 Tailwind 클래스 우선순위가
// 문자열 순서를 보장하지 않아 무시될 수 있어, padded prop으로 분기한다
const InnerCard = ({
  className = '',
  padded = true,
  children,
}: {
  className?: string;
  padded?: boolean;
  children: ReactNode;
}) => (
  <div
    className={`bg-bg-white flex w-full flex-col items-start overflow-hidden rounded-[var(--radius-medium2)] ${padded ? 'p-[var(--padding-6)]' : ''} ${className}`}
  >
    {children}
  </div>
);

const ImageThumbnail = ({ type }: { type: DetailTemplateType }) => {
  switch (type) {
    case 'IMAGE_1_1':
      return <ImageSlot className="h-[334px] w-full" />;
    case 'IMAGE_1_2':
      return <ImageSlot className="h-[164px] w-full" />;
    case 'IMAGE_2_1':
      return (
        <div className="flex w-full gap-[var(--gap-3)]">
          <ImageSlot className="h-[164px] flex-1" />
          <ImageSlot className="h-[164px] flex-1" />
        </div>
      );
    case 'IMAGE_2_2':
      return (
        <div className="flex w-full flex-col gap-[var(--gap-3)]">
          <ImageSlot className="h-[164px] w-full" />
          <ImageSlot className="h-[164px] w-full" />
        </div>
      );
    case 'IMAGE_3_1':
      return (
        <div className="flex w-full flex-col gap-[var(--gap-3)]">
          <div className="flex w-full gap-[var(--gap-3)]">
            <ImageSlot className="h-[164px] flex-1" />
            <ImageSlot className="h-[164px] flex-1" />
          </div>
          <ImageSlot className="h-[164px] w-full" />
        </div>
      );
    case 'IMAGE_3_2':
      return (
        <div className="flex w-full flex-col gap-[var(--gap-3)]">
          <ImageSlot className="h-[164px] w-full" />
          <div className="flex w-full gap-[var(--gap-3)]">
            <ImageSlot className="h-[164px] flex-1" />
            <ImageSlot className="h-[164px] flex-1" />
          </div>
        </div>
      );
    case 'IMAGE_4_1':
      return (
        <div className="grid w-full grid-cols-2 gap-[var(--gap-3)]">
          <ImageSlot className="h-[164px]" />
          <ImageSlot className="h-[164px]" />
          <ImageSlot className="h-[164px]" />
          <ImageSlot className="h-[164px]" />
        </div>
      );
    case 'IMAGE_4_2':
      return (
        <div className="grid w-full grid-cols-2 gap-[var(--gap-3)]">
          <ImageSlot className="h-[80px]" />
          <ImageSlot className="h-[80px]" />
          <ImageSlot className="h-[80px]" />
          <ImageSlot className="h-[80px]" />
        </div>
      );
    default:
      return null;
  }
};

// TEXT_1은 헤더줄만, TEXT_2~5는 헤더줄 뒤에 2줄짜리 본문 그룹이 1~4개씩 붙는다
const TEXT_BODY_GROUP_COUNT: Partial<Record<DetailTemplateType, number>> = {
  TEXT_2: 1,
  TEXT_3: 2,
  TEXT_4: 3,
  TEXT_5: 4,
};

const TextThumbnail = ({ type }: { type: DetailTemplateType }) => {
  const bodyGroupCount = TEXT_BODY_GROUP_COUNT[type] ?? 0;

  return (
    <InnerCard>
      <div className="flex w-full flex-col items-start gap-[var(--gap-3)]">
        <Bar className="h-[9px] w-[112px]" />
        {type === 'TEXT_1' ? (
          <Bar className="h-[24px] w-[164px]" />
        ) : (
          <Bar className="h-[32px] w-[97px]" />
        )}
        {Array.from({ length: bodyGroupCount }, (_, groupIndex) => (
          <div
            key={groupIndex}
            className="flex w-[180px] flex-col items-start gap-[var(--gap-2)]"
          >
            <Bar className="h-[6px] w-full" />
            <Bar className="h-[6px] w-full" />
          </div>
        ))}
      </div>
    </InnerCard>
  );
};

const MaterialThumbnail = () => (
  <div className="flex w-full flex-col items-start gap-[10px]">
    <Bar className="h-[16px] w-[112px]" />
    <InnerCard padded={false}>
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="border-border-subtler flex w-full items-center border-t first:border-t-0"
        >
          <div className="border-border-subtler flex size-[67px] shrink-0 items-center justify-center border-r">
            <div className="size-[36px] shrink-0 rounded-[var(--radius-max)] bg-[var(--color-bg-gray-subtle)]" />
          </div>
          <div className="flex h-[67px] flex-1 flex-col justify-center gap-[var(--gap-3)] px-[var(--padding-4)]">
            <Bar className="h-[9px] w-[112px]" />
            <div className="flex w-full flex-col items-start gap-[var(--gap-2)]">
              <Bar className="h-[6px] w-full" />
              <Bar className="h-[6px] w-full" />
            </div>
          </div>
        </div>
      ))}
    </InnerCard>
  </div>
);

const SizeTipThumbnail = () => (
  <InnerCard>
    <div className="flex w-full flex-col items-start gap-[var(--gap-4)]">
      <div className="flex flex-col items-start gap-[var(--gap-2)]">
        <Bar className="h-[9px] w-[28px]" />
        <Bar className="h-[6px] w-[130px]" />
      </div>
      <div className="flex w-[180px] flex-col items-start gap-[var(--gap-2)]">
        {Array.from({ length: 3 }, (_, index) => (
          <Bar key={index} className="h-[6px] w-full" />
        ))}
      </div>
    </div>
  </InnerCard>
);

const SizeInfoThumbnail = () => (
  <InnerCard>
    <div className="flex w-full flex-col items-center gap-[var(--gap-6)]">
      <div className="flex w-full flex-col items-start gap-[var(--gap-2)]">
        <Bar className="h-[9px] w-[28px]" />
        <Bar className="h-[6px] w-[130px]" />
        <Bar className="h-[6px] w-[130px]" />
      </div>
      <div className="size-[100px] shrink-0 bg-[var(--color-bg-gray-subtle)]" />
      <div className="flex w-full flex-col items-start gap-[11px]">
        <Bar className="h-[12px] w-full" />
        {Array.from({ length: 4 }, (_, lineIndex) => (
          <Bar key={lineIndex} className="h-[1px] w-full" />
        ))}
      </div>
      <div className="border-border-subtler flex w-full flex-col border">
        {Array.from({ length: 5 }, (_, rowIndex) => (
          <div
            key={rowIndex}
            className="border-border-subtler flex w-full items-center border-t first:border-t-0"
          >
            <div className="border-border-subtler h-[12px] w-[40px] shrink-0 border-r" />
            <div className="flex flex-1 items-center gap-[var(--gap-6)] px-[var(--padding-4)] py-[var(--padding-2)]">
              <div className="border-border-subtle size-[4px] shrink-0 rounded-[1px] border" />
              <div className="border-border-subtle size-[4px] shrink-0 rounded-[1px] border" />
              <div className="border-border-subtle size-[4px] shrink-0 rounded-[1px] border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </InnerCard>
);

const renderThumbnail = (type: DetailTemplateType) => {
  if (type.startsWith('IMAGE_')) return <ImageThumbnail type={type} />;
  if (type.startsWith('TEXT_')) return <TextThumbnail type={type} />;
  if (type === 'MATERIAL') return <MaterialThumbnail />;
  if (type === 'SIZE_TIP') return <SizeTipThumbnail />;
  if (type === 'SIZE_INFO') return <SizeInfoThumbnail />;
  return null;
};

export const TemplateThumbnailCard = ({
  type,
  label,
  draggable = false,
  onDragStart,
}: TemplateThumbnailCardProps) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      aria-label={label}
      className="bg-bg-gray-subtler hover:bg-bg-gray-subtle flex w-full cursor-grab items-center justify-center overflow-hidden rounded-[var(--radius-large2)] border border-transparent p-[var(--padding-8)] hover:border-[var(--color-btn-outline-border-hovered)] hover:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)] active:cursor-grabbing"
    >
      {renderThumbnail(type)}
    </div>
  );
};
