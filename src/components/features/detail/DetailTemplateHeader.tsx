'use client';

import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Body } from '@/components/commons/Typography';

interface DetailTemplateHeaderProps {
  pageNumber: number;
}

// AI 수정하기 버튼, 순서 변경 화살표, 삭제 버튼은 지금은 UI만 구현돼 있고
// 클릭 동작(실제 순서 변경/삭제/AI 수정)은 이후 작업에서 연결한다
export const DetailTemplateHeader = ({
  pageNumber,
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
          className="flex size-[20px] items-center justify-center"
        >
          <ChevronUp size={20} className="text-icon-gray-light" />
        </button>
        <button
          type="button"
          className="flex size-[20px] items-center justify-center"
        >
          <ChevronDown size={20} className="text-icon-gray-light" />
        </button>
        <button
          type="button"
          className="flex size-[20px] items-center justify-center"
        >
          <Trash2 size={20} className="text-icon-gray-light" />
        </button>
      </div>
    </div>
  );
};
