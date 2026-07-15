'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Body } from '@/components/commons/Typography';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  panelWidthClassName?: string;
  panelGapClassName?: string;
  triggerClassName?: string;
  labelClassName?: string;
  labelBold?: boolean;
  className?: string;
}

export const Dropdown = ({
  label,
  options,
  value,
  onChange,
  panelWidthClassName = 'w-[120px]',
  panelGapClassName = 'mt-6',
  triggerClassName = '',
  labelClassName = 'text-text-basic',
  labelBold = false,
  className = '',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (nextValue: string | null) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex cursor-pointer items-center gap-[var(--gap-1)] ${triggerClassName}`}
      >
        <Body size="xsmall" bold={labelBold} className={labelClassName}>
          {label}
        </Body>
        <ChevronDown
          size={16}
          className={`text-icon-gray-light ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          className={[
            'absolute top-full left-0 z-10 flex flex-col overflow-hidden',
            'rounded-[var(--radius-large1)] shadow-[0px_0px_12px_rgba(0,0,0,0.08)]',
            panelGapClassName,
            panelWidthClassName,
          ].join(' ')}
        >
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className={[
              'w-full p-[var(--padding-4)] text-left',
              value === null
                ? 'bg-bg-gray-subtle'
                : 'bg-bg-white hover:bg-bg-gray-subtle',
            ].join(' ')}
          >
            <Body
              size="xsmall"
              bold
              className={
                value === null ? 'text-text-subtle' : 'text-text-subtler'
              }
            >
              전체
            </Body>
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={[
                'w-full p-[var(--padding-4)] text-left',
                value === option.value
                  ? 'bg-bg-gray-subtle'
                  : 'bg-bg-white hover:bg-bg-gray-subtle',
              ].join(' ')}
            >
              <Body
                size="xsmall"
                bold
                className={
                  value === option.value
                    ? 'text-text-subtle'
                    : 'text-text-subtler'
                }
              >
                {option.label}
              </Body>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
