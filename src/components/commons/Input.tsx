'use client';

import { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: React.ReactNode;
}

export const Input = ({
  label,
  error,
  suffix,
  required,
  type,
  className = '',
  ...props
}: InputProps) => {
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  const hasSuffix = isPassword || !!suffix;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-text-basic mb-1 flex items-center text-[14px] leading-[1.5] font-medium">
          {label}
          {required && <span className="text-text-danger ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={[
            'bg-bg-white text-text-basic placeholder:text-text-disabled',
            'w-full rounded-(--radius-medium1) border px-[var(--padding-4)] py-[var(--size-height-2)] text-[14px] leading-[1.5]',
            'focus:border-border-primary focus:outline-none',
            error ? 'border-border-danger' : 'border-border-subtle',
            hasSuffix ? 'pr-10' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {isPassword ? (
          <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center">
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              className="text-icon-gray-light hover:text-icon-gray cursor-pointer"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
        ) : suffix ? (
          <div className="text-icon-gray-light absolute top-1/2 right-3 flex -translate-y-1/2 items-center">
            {suffix}
          </div>
        ) : null}
      </div>
      {error && (
        <span className="text-text-danger mt-1 text-[12px] leading-[1.5]">
          {error}
        </span>
      )}
    </div>
  );
};
