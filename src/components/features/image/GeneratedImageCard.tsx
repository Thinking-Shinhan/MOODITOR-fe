'use client';

import Image from 'next/image';
import { LikeButton } from '@/components/commons/LikeButton';

interface GeneratedImageCardProps {
  url: string;
  liked: boolean;
  onToggleLike: () => void;
  likePending?: boolean;
  onClick?: () => void;
  className: string;
}

export const GeneratedImageCard = ({
  url,
  liked,
  onToggleLike,
  likePending = false,
  onClick,
  className,
}: GeneratedImageCardProps) => {
  return (
    <div
      onClick={onClick}
      className={[
        'group hover:outline-border-border relative overflow-hidden rounded-[var(--radius-small1)] hover:outline hover:outline-1',
        onClick ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
    >
      <Image
        src={url}
        alt=""
        fill
        sizes="400px"
        quality={65}
        className="object-cover"
      />
      <div onClick={(event) => event.stopPropagation()} className="contents">
        <LikeButton
          liked={liked}
          onToggleLike={onToggleLike}
          disabled={likePending}
          className={[
            'absolute right-[16px] bottom-[16px] transition-opacity',
            liked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          ].join(' ')}
        />
      </div>
    </div>
  );
};
