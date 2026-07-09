'use client';

import { Loader2 } from 'lucide-react';

type SpinnerSize = 'small' | 'medium' | 'large';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeConfig: Record<SpinnerSize, number> = {
  small: 14,
  medium: 20,
  large: 32,
};

export const Spinner = ({ size = 'medium', className = '' }: SpinnerProps) => (
  <Loader2 size={sizeConfig[size]} className={`animate-spin ${className}`} />
);
