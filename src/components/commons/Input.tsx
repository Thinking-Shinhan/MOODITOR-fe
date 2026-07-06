'use client';

import { InputHTMLAttributes, useState, useId } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { InputMessage } from '@/components/commons/InputMessage';

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
  disabled,
  id: externalId,
  className = '',
  ...props
}: InputProps) => {
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = externalId ?? generatedId;

  const hasSuffix = isPassword || !!suffix;

  return (
    <div className="flex flex-col gap-[var(--size-height-2)]">
      {label && (
        <label
          htmlFor={inputId}
          className="text-text-subtle cursor-pointer text-[14px] leading-[150%] font-semibold"
        >
          {label}
          {required && <span className="text-text-danger ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          disabled={disabled}
          required={required}
          className={[
            'w-full rounded-(--radius-medium2) border text-[12px] leading-normal',
            'bg-bg-white text-text-basic placeholder:text-text-subtler',
            'p-[var(--padding-5)]',
            'hover:bg-bg-gray-subtler',
            'focus:border-border-primary focus:bg-bg-white focus:outline-none',
            'disabled:bg-bg-gray-subtle disabled:text-text-disabled disabled:cursor-not-allowed',
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
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
              aria-pressed={showPassword}
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
      {error && <InputMessage state="error" message={error} />}
    </div>
  );
};
