'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { LikeButton } from '@/components/commons/LikeButton';
import { Body } from '@/components/commons/Typography';

export type LibraryImageCardType = 'MODEL_CUT' | 'PRODUCT_CUT' | 'DETAIL_PAGE';

interface LibraryImageCardProps {
  type: LibraryImageCardType;
  imageUrl: string;
  fileName: string;
  createdAt: string;
  liked?: boolean;
  onToggleLike?: () => void;
  likePending?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
}

const CATEGORY_LABEL: Record<LibraryImageCardType, string> = {
  MODEL_CUT: '모델컷',
  PRODUCT_CUT: '제품컷',
  DETAIL_PAGE: '상세페이지',
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const LibraryImageCard = ({
  type,
  imageUrl,
  fileName,
  createdAt,
  liked = false,
  onToggleLike,
  likePending = false,
  onDelete,
  onClick,
}: LibraryImageCardProps) => {
  const isDetailPage = type === 'DETAIL_PAGE';

  return (
    <div className="bg-bg-white border-border-subtler hover:border-border-basic group flex w-[215px] shrink-0 flex-col items-start overflow-hidden rounded-[var(--radius-medium2)] border shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
      <div
        onClick={onClick}
        className={`bg-bg-gray-subtle relative w-full shrink-0 ${isDetailPage ? 'h-[280px]' : 'h-[160px]'} ${onClick ? 'cursor-pointer' : ''}`}
      >
        {isDetailPage ? (
          <Image
            src={imageUrl}
            alt=""
            width={167}
            height={256}
            quality={60}
            className="absolute bottom-0 left-1/2 h-[256px] w-[167px] -translate-x-1/2 rounded-t-[var(--radius-small2)] object-cover object-top"
          />
        ) : (
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="215px"
            quality={60}
            className="object-cover"
          />
        )}

        <div className="bg-btn-secondary-fill-hovered absolute top-[var(--padding-4)] left-[var(--padding-4)] flex items-center gap-[var(--gap-2)] rounded-[var(--radius-small1)] px-[var(--padding-3)] py-[var(--padding-2)]">
          <Body size="xsmall" bold className="text-text-primary-basic">
            {CATEGORY_LABEL[type]}
          </Body>
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            className="bg-btn-tertiary-fill absolute top-[var(--padding-4)] right-[var(--padding-4)] flex size-[20px] cursor-pointer items-center justify-center rounded-[var(--radius-xsmall2)] opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Trash2 size={14} className="text-icon-gray-light" />
          </button>
        )}

        {!isDetailPage ? (
          <div
            onClick={(event) => event.stopPropagation()}
            className="contents"
          >
            <LikeButton
              liked={liked}
              onToggleLike={onToggleLike}
              disabled={likePending}
              strokeWidth={1.3}
              iconClassName={liked ? 'text-icon-gray' : 'text-icon-inverse'}
              className="absolute right-[var(--padding-4)] bottom-[var(--padding-4)]"
            />
          </div>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-[var(--gap-2)] px-[var(--padding-5)] py-[var(--padding-4)]">
        <Body size="small" bold className="text-text-basic w-full truncate">
          {fileName}
        </Body>
        <Body size="xsmall" className="text-text-subtler w-full">
          {formatDate(createdAt)}
        </Body>
      </div>
    </div>
  );
};
