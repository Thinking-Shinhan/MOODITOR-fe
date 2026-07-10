'use client';

import { Heart } from 'lucide-react';

interface GeneratedImageCardProps {
  url: string;
  liked: boolean;
  onToggleLike: () => void;
  className: string;
}

export const GeneratedImageCard = ({
  url,
  liked,
  onToggleLike,
  className,
}: GeneratedImageCardProps) => {
  return (
    <div
      className={[
        'group relative overflow-hidden rounded-[var(--radius-small1)] border transition-colors',
        liked
          ? 'border-border-border'
          : 'hover:border-border-subtle border-transparent',
        className,
      ].join(' ')}
    >
      <img
        src={url}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <button
        type="button"
        onClick={onToggleLike}
        aria-label={liked ? '좋아요 취소' : '좋아요'}
        aria-pressed={liked}
        className={[
          'absolute top-[15px] left-[15px] flex size-5 cursor-pointer items-center justify-center transition-opacity',
          liked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        ].join(' ')}
      >
        <Heart
          size={20}
          className="text-icon-gray"
          fill={liked ? 'currentColor' : 'none'}
        />
      </button>
    </div>
  );
};
