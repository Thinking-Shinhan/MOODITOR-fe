'use client';

import { Check, Loader2 } from 'lucide-react';
import { Body } from '@/components/commons/Typography';
import type { CopyReviewStatus } from '@/types/reviewCopy';

interface CopyReviewCardProps {
  pageNumber: number;
  subtitle: string;
  issueTag: string;
  currentText: string;
  suggestedText: string;
  reason: string;
  status?: CopyReviewStatus;
  onApply?: () => void;
  onClick?: () => void;
  className?: string;
}

export const CopyReviewCard = ({
  pageNumber,
  subtitle,
  issueTag,
  currentText,
  suggestedText,
  reason,
  status = 'idle',
  onApply,
  onClick,
  className = '',
}: CopyReviewCardProps) => {
  const isApplying = status === 'applying';
  const isApplied = status === 'applied';

  const containerStateClass = isApplied
    ? 'border-border-subtler shadow-[0px_2px_4px_rgba(0,0,0,0.04)]'
    : isApplying
      ? 'border-border-subtle shadow-[0px_2px_4px_rgba(0,0,0,0.04)]'
      : 'border-border-subtler hover:border-border-subtle hover:shadow-[0px_2px_4px_rgba(0,0,0,0.04)]';

  const buttonStateClass = isApplied
    ? 'bg-btn-disabled-fill'
    : isApplying
      ? 'bg-btn-secondary-fill-hovered border-btn-secondary-border border'
      : 'bg-btn-tertiary-fill hover:bg-btn-tertiary-fill-hovered hover:border-btn-outline-border-hovered hover:border';

  return (
    <div
      onClick={onClick}
      className={`bg-bg-white flex w-[296px] cursor-pointer flex-col items-start gap-[var(--gap-5)] rounded-[var(--radius-xsmall2)] border p-[var(--padding-5)] transition-colors ${containerStateClass} ${className}`}
    >
      <div className="flex w-full flex-col items-start gap-[var(--gap-4)]">
        <div className="flex w-full items-center justify-between">
          <div className="text-text-basic flex items-center gap-[var(--gap-2)] text-[12px] leading-[1.5]">
            <span className="font-bold">페이지 {pageNumber}</span>
            <span className="font-normal">·</span>
            <span className="font-normal">{subtitle}</span>
          </div>
          <div className="bg-btn-secondary-fill-hovered flex shrink-0 items-center gap-[var(--gap-2)] rounded-[var(--radius-small1)] px-[var(--padding-3)] py-[var(--padding-2)]">
            <Body
              size="xsmall"
              bold
              className="text-text-primary-basic whitespace-nowrap"
            >
              {issueTag}
            </Body>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-[var(--gap-5)]">
          <div className="flex w-full flex-col items-start gap-[var(--gap-3)]">
            <div className="flex w-full flex-col items-start gap-[var(--gap-2)] px-[4px] py-[var(--padding-2)]">
              <Body
                size="xsmall"
                bold
                className="text-text-basic whitespace-nowrap"
              >
                현재 문구
              </Body>
              <Body size="xsmall" className="text-text-subtler w-full">
                {currentText}
              </Body>
            </div>
            <div className="bg-bg-gray-subtler flex w-full flex-col items-start gap-[var(--gap-2)] rounded-[var(--radius-xsmall2)] px-[4px] py-[var(--padding-2)]">
              <Body
                size="xsmall"
                bold
                className="text-text-basic whitespace-nowrap"
              >
                제안 문구
              </Body>
              <Body size="xsmall" className="text-text-basic w-full">
                {suggestedText}
              </Body>
            </div>
          </div>

          <div className="border-border-subtler w-full border-t" />

          <div className="flex w-full flex-col items-start gap-[var(--gap-2)] px-[4px] py-[var(--padding-2)]">
            <Body
              size="xsmall"
              bold
              className="text-text-basic whitespace-nowrap"
            >
              추천 이유
            </Body>
            <Body size="xsmall" className="text-text-subtle w-full">
              {reason}
            </Body>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onApply?.();
        }}
        disabled={status !== 'idle'}
        className={`flex w-full items-center justify-center gap-[var(--gap-1)] rounded-[var(--radius-xsmall2)] px-[var(--padding-4)] py-[var(--size-height-2)] transition-colors ${
          isApplied ? 'cursor-not-allowed' : 'cursor-pointer'
        } ${buttonStateClass}`}
      >
        {status === 'idle' && (
          <Body size="xsmall" bold className="text-text-subtler">
            적용하기
          </Body>
        )}
        {isApplying && (
          <>
            <Loader2
              size={14}
              className="text-icon-primary-basic animate-spin"
            />
            <Body size="xsmall" bold className="text-text-primary-basic">
              적용 중
            </Body>
          </>
        )}
        {isApplied && (
          <>
            <Check size={14} className="text-icon-disabled-on" />
            <Body size="xsmall" bold className="text-text-disabled-on">
              적용 완료
            </Body>
          </>
        )}
      </button>
    </div>
  );
};
