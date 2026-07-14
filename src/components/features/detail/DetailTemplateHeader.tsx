'use client';

import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Body } from '@/components/commons/Typography';

interface DetailTemplateHeaderProps {
  pageNumber: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  moveUpDisabled: boolean;
  moveDownDisabled: boolean;
  onDelete: () => void;
}

export const DetailTemplateHeader = ({
  pageNumber,
  onMoveUp,
  onMoveDown,
  moveUpDisabled,
  moveDownDisabled,
  onDelete,
}: DetailTemplateHeaderProps) => {
  return (
    <div className="flex w-full items-center justify-between py-[var(--padding-3)]">
      <button
        type="button"
        className="bg-btn-tertiary-fill flex items-center justify-center gap-[var(--gap-1)] rounded-[var(--radius-xsmall2)] px-[var(--padding-4)] py-[var(--size-height-2)]"
      >
        <Body size="xsmall" bold className="text-text-subtler">
          AI 수정하기
        </Body>
      </button>
      <div className="flex items-center gap-[var(--gap-3)]">
        <div className="flex items-center gap-[var(--gap-1)]">
          <Body size="small" className="text-text-basic">
            페이지
          </Body>
          <Body size="small" className="text-text-basic">
            {pageNumber}
          </Body>
        </div>
        <button
          type="button"
          onClick={onMoveUp}
          disabled={moveUpDisabled}
          onPointerDown={(event) => event.stopPropagation()}
          className="flex size-[20px] cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronUp size={20} className="text-icon-gray-light" />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={moveDownDisabled}
          onPointerDown={(event) => event.stopPropagation()}
          className="flex size-[20px] cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronDown size={20} className="text-icon-gray-light" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          onPointerDown={(event) => event.stopPropagation()}
          className="flex size-[20px] cursor-pointer items-center justify-center"
        >
          <Trash2 size={20} className="text-icon-gray-light" />
        </button>
      </div>
    </div>
  );
};
