'use client';

import { TextareaHTMLAttributes, useState, useId } from 'react';
import { InputMessage } from '@/components/commons/InputMessage';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({
  label,
  error,
  maxLength,
  required,
  disabled,
  id: externalId,
  onChange,
  value,
  defaultValue,
  className = '',
  ...props
}: TextareaProps) => {
  const generatedId = useId();
  const inputId = externalId ?? generatedId;

  const initialLength =
    typeof value === 'string'
      ? value.length
      : typeof defaultValue === 'string'
        ? defaultValue.length
        : 0;
  const [charCount, setCharCount] = useState(initialLength);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    onChange?.(e);
  };

  const showBottom = !!error || maxLength !== undefined;

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

      <textarea
        id={inputId}
        disabled={disabled}
        maxLength={maxLength}
        required={required}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={[
          'h-[144px] w-full resize-none rounded-(--radius-medium2) border',
          'px-[var(--padding-5)] py-[var(--padding-4)]',
          'text-[12px] leading-normal',
          'bg-bg-white text-text-basic placeholder:text-text-subtler',
          'hover:bg-bg-gray-subtler',
          'focus:border-border-primary focus:bg-bg-white focus:outline-none',
          'disabled:bg-bg-gray-subtler disabled:text-text-disabled disabled:cursor-not-allowed',
          error ? 'border-border-danger' : 'border-border-subtle',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />

      {showBottom && (
        <div className="flex items-center justify-between">
          {error ? <InputMessage state="error" message={error} /> : <span />}
          {maxLength !== undefined && (
            <span className="text-[12px] leading-normal">
              <span className="text-text-basic">{charCount}</span>
              <span className="text-text-disabled-on">/{maxLength}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
