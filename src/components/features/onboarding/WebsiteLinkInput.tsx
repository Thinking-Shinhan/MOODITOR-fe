'use client';

import { Check } from 'lucide-react';

interface WebsiteLinkInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const WebsiteLinkInput = ({
  value,
  onChange,
}: WebsiteLinkInputProps) => {
  const isUrlFilled = value.trim().length > 0;

  return (
    <div className="border-btn-outline-border flex w-[660px] flex-col gap-[var(--size-height-3)] rounded-[var(--radius-large1)] border-[0.8px] p-[var(--padding-7)]">
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https:// 브랜드 웹사이트 링크를 입력하세요"
        className="text-text-basic placeholder:text-text-subtler h-[72px] w-full resize-none text-[16px] leading-[1.5] focus:outline-none"
      />
      <div className="flex w-full items-center justify-end">
        <button
          type="button"
          disabled={!isUrlFilled}
          className={`flex size-8 items-center justify-center rounded-[var(--radius-small1)] transition-colors ${
            isUrlFilled
              ? 'bg-btn-primary-fill-black cursor-pointer'
              : 'bg-btn-disabled-fill cursor-not-allowed'
          }`}
        >
          <Check
            size={16}
            className={isUrlFilled ? 'text-icon-inverse' : 'text-icon-disabled'}
          />
        </button>
      </div>
    </div>
  );
};
