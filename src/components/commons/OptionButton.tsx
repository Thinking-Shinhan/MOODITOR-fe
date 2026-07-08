'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@/components/commons/Button';

interface OptionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children?: ReactNode;
}

export const OptionButton = ({
  selected = false,
  className = '',
  children,
  ...props
}: OptionButtonProps) => (
  <Button
    variant={selected ? 'secondary' : 'tertiary'}
    size="small"
    aria-pressed={selected}
    className={[
      'rounded-[var(--radius-small1)]!',
      selected ? 'bg-btn-secondary-fill-hovered!' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </Button>
);
