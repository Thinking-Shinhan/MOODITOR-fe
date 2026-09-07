'use client';

import { Heart } from 'lucide-react';

interface LikeButtonProps {
  liked: boolean;
  onToggleLike?: () => void;
  disabled?: boolean;
  className?: string;
  iconClassName?: string;
  strokeWidth?: number;
}

export const LikeButton = ({
  liked,
  onToggleLike,
  disabled = false,
  className = '',
  iconClassName = 'text-icon-gray',
  strokeWidth,
}: LikeButtonProps) => (
  <button
    type="button"
    onClick={onToggleLike}
    disabled={disabled}
    aria-label={liked ? '좋아요 취소' : '좋아요'}
    aria-pressed={liked}
    className={`flex size-5 items-center justify-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
  >
    <Heart
      size={20}
      strokeWidth={strokeWidth}
      className={disabled ? 'text-icon-disabled' : iconClassName}
      fill={liked && !disabled ? 'currentColor' : 'none'}
    />
  </button>
);
