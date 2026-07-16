'use client';

import { LikeButton } from '@/components/commons/LikeButton';

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
      <LikeButton
        liked={liked}
        onToggleLike={onToggleLike}
        className={[
          'absolute top-[15px] left-[15px] transition-opacity',
          liked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        ].join(' ')}
      />
    </div>
  );
};
