'use client';

import { InputHTMLAttributes } from 'react';
import { Search, CircleX } from 'lucide-react';

type SearchFieldSize = 'large' | 'medium' | 'small';

interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  size?: SearchFieldSize;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
}

const sizeConfig: Record<
  SearchFieldSize,
  { wrapper: string; gap: string; icon: number; text: string }
> = {
  large: {
    wrapper: 'px-[var(--padding-7)] py-[var(--padding-6)]',
    gap: 'gap-[var(--gap-3)]',
    icon: 20,
    text: 'text-[16px]',
  },
  medium: {
    wrapper: 'px-[var(--padding-6)] py-[var(--padding-5)]',
    gap: 'gap-[var(--gap-3)]',
    icon: 16,
    text: 'text-[14px]',
  },
  small: {
    wrapper: 'px-[var(--padding-5)] py-[var(--padding-4)]',
    gap: 'gap-[var(--gap-2)]',
    icon: 14,
    text: 'text-[12px]',
  },
};

export const SearchField = ({
  size = 'large',
  value,
  onChange,
  onClear,
  disabled,
  className = '',
  ...props
}: SearchFieldProps) => {
  const { wrapper, gap, icon, text } = sizeConfig[size];

  return (
    <div
      className={[
        'flex w-full items-center justify-between rounded-[var(--radius-large1)] border transition-colors',
        'bg-bg-white border-border-subtle',
        'hover:border-border-primary hover:shadow-[0px_2px_4px_rgba(0,0,0,0.04)]',
        'focus-within:border-border-primary focus-within:shadow-[0px_2px_4px_rgba(0,0,0,0.04)]',
        disabled ? 'cursor-not-allowed opacity-40' : '',
        wrapper,
        className,
      ].join(' ')}
    >
      <div className={`flex min-w-0 flex-1 items-center ${gap}`}>
        <Search size={icon} className="text-icon-gray-light shrink-0" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={[
            'text-text-basic placeholder:text-text-subtler min-w-0 flex-1',
            'bg-transparent font-semibold outline-none',
            text,
          ].join(' ')}
          {...props}
        />
      </div>
      <button
        type="button"
        onClick={onClear}
        disabled={disabled}
        aria-label="검색어 지우기"
        className="text-icon-gray-light shrink-0 cursor-pointer disabled:cursor-not-allowed"
      >
        <CircleX size={icon} />
      </button>
    </div>
  );
};
