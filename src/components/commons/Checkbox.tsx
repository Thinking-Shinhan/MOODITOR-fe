'use client';

import { InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

type CheckboxSize = 'large' | 'medium';

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  size?: CheckboxSize;
}

const sizeConfig: Record<CheckboxSize, { box: string; iconSize: number }> = {
  large: { box: 'w-6 h-6', iconSize: 20 },
  medium: { box: 'w-5 h-5', iconSize: 16 },
};

export const Checkbox = ({
  size = 'large',
  checked,
  disabled,
  className = '',
  ...props
}: CheckboxProps) => {
  const { box, iconSize } = sizeConfig[size];

  return (
    <label
      className={[
        'inline-flex cursor-pointer items-center gap-3',
        disabled ? 'cursor-not-allowed opacity-40' : '',
        className,
      ].join(' ')}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <span
        className={[
          'inline-flex shrink-0 items-center justify-center rounded-[var(--radius-xsmall2)] p-[var(--padding-1)] transition-colors',
          box,
          checked
            ? 'bg-btn-primary-fill'
            : 'bg-btn-secondary-fill border-border-basic border',
        ].join(' ')}
      >
        {checked && (
          <Check
            size={iconSize}
            className="text-icon-inverse"
            strokeWidth={2.5}
          />
        )}
      </span>
    </label>
  );
};
