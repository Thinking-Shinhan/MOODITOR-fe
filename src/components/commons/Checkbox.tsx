'use client';

import { InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

type CheckboxSize = 'large' | 'medium' | 'small';
type CheckboxVariant = 'primary' | 'secondary';

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'defaultChecked'
> {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const sizeConfig: Record<CheckboxSize, { box: string; iconSize: number }> = {
  large: {
    box: 'w-[var(--size-height-6)] h-[var(--size-height-6)]',
    iconSize: 20,
  },
  medium: {
    box: 'w-[var(--size-height-5)] h-[var(--size-height-5)]',
    iconSize: 16,
  },
  small: { box: 'w-[14px] h-[14px]', iconSize: 12 },
};

const checkedFillConfig: Record<CheckboxVariant, string> = {
  primary: 'bg-btn-primary-fill',
  secondary: 'btn-primary-fill-black',
};

export const Checkbox = ({
  size = 'large',
  variant = 'primary',
  checked,
  onChange,
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
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <span
        className={[
          'inline-flex shrink-0 items-center justify-center rounded-[var(--radius-xsmall2)] p-[var(--padding-1)] transition-colors',
          box,
          checked
            ? checkedFillConfig[variant]
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
