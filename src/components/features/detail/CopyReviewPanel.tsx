'use client';

import { X } from 'lucide-react';
import { Body, Heading } from '@/components/commons/Typography';
import { Button } from '@/components/commons/Button';
import { CopyReviewCard } from '@/components/features/detail/CopyReviewCard';
import type { CopyReviewItem } from '@/types/reviewCopy';

interface CopyReviewPanelProps {
  items: CopyReviewItem[];
  onApply: (id: string) => void;
  onApplyAll: () => void;
  onClose: () => void;
  onFocusItem: (id: string) => void;
  applyAllDisabled?: boolean;
}

export const CopyReviewPanel = ({
  items,
  onApply,
  onApplyAll,
  onClose,
  onFocusItem,
  applyAllDisabled = false,
}: CopyReviewPanelProps) => {
  return (
    <div className="border-border-subtler bg-bg-white relative flex h-full w-[380px] shrink-0 flex-col border-r">
      <div className="w-full flex-1 overflow-y-auto">
        <div className="flex w-full flex-col items-start gap-[var(--gap-7)] p-[var(--padding-9)] pb-[104px]">
          <div className="flex w-full flex-col items-start gap-[var(--gap-2)]">
            <div className="flex w-full items-center justify-between">
              <Heading size="xsmall" className="text-text-basic">
                문구 검수
              </Heading>
              <button
                type="button"
                onClick={onClose}
                aria-label="문구 검수 패널 닫기"
                className="text-icon-gray hover:text-icon-gray-light flex size-4 shrink-0 cursor-pointer items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <Body size="xsmall" className="text-text-subtler">
              AI가 문구를 검토하고 더 자연스러운 표현을 제안해 드려요.
            </Body>
          </div>

          {items.length === 0 ? (
            <Body size="xsmall" className="text-text-subtler">
              검수할 문구가 없어요.
            </Body>
          ) : (
            items.map((item) => (
              <CopyReviewCard
                key={item.id}
                pageNumber={item.pageNumber}
                subtitle={item.subtitle}
                issueTag={item.issueTag}
                currentText={item.currentText}
                suggestedText={item.suggestedText}
                reason={item.reason}
                status={item.status}
                onApply={() => onApply(item.id)}
                onClick={() => onFocusItem(item.id)}
              />
            ))
          )}
        </div>
      </div>

      {items.length > 0 && (
        <div className="absolute bottom-[28px] left-[32px] w-[296px]">
          <Button
            variant="primary"
            size="small"
            className="right-[var(--padding-9)] left-[var(--padding-9)] w-full rounded-[var(--radius-small1)]!"
            onClick={onApplyAll}
            disabled={applyAllDisabled}
          >
            모두 적용하기
          </Button>
        </div>
      )}
    </div>
  );
};
