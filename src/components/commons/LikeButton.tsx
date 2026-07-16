'use client';

import { Heart } from 'lucide-react';

interface LikeButtonProps {
  liked: boolean;
  onToggleLike?: () => void;
  className?: string;
  iconClassName?: string;
  strokeWidth?: number;
}

export const LikeButton = ({
  liked,
  onToggleLike,
  className = '',
  iconClassName = 'text-icon-gray',
  strokeWidth,
}: LikeButtonProps) => (
  <button
    type="button"
    onClick={onToggleLike}
    aria-label={liked ? '좋아요 취소' : '좋아요'}
    aria-pressed={liked}
    className={`flex size-5 cursor-pointer items-center justify-center ${className}`}
  >
    <Heart
      size={20}
      strokeWidth={strokeWidth}
      className={iconClassName}
      fill={liked ? 'currentColor' : 'none'}
    />
  </button>
);
