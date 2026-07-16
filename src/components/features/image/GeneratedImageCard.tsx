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
        'group border-border-border relative overflow-hidden rounded-[var(--radius-small1)] border',
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
          'absolute right-[16px] bottom-[16px] transition-opacity',
          liked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        ].join(' ')}
      />
    </div>
  );
};
