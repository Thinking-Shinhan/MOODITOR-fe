'use client';

import { SearchField } from '@/components/commons/SearchField';
import { Body } from '@/components/commons/Typography';

interface ProductListToolbarProps {
  selectedCount: number;
  totalCount: number;
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
}

export const ProductListToolbar = ({
  selectedCount,
  totalCount,
  searchKeyword,
  onSearchKeywordChange,
}: ProductListToolbarProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-[var(--gap-3)]">
        <Body size="medium" bold className="text-text-basic">
          전체 상품
        </Body>
        <div className="flex items-center gap-[var(--gap-2)]">
          <Body size="small" bold className="text-text-primary-basic">
            {selectedCount}
          </Body>
          <Body size="small" className="text-text-subtler">
            /
          </Body>
          <Body size="small" className="text-text-subtler">
            {totalCount}
          </Body>
        </div>
      </div>
      <div className="w-[389px] shrink-0">
        <SearchField
          size="small"
          value={searchKeyword}
          onChange={(e) => onSearchKeywordChange(e.target.value)}
          onClear={() => onSearchKeywordChange('')}
          placeholder="검색어를 입력해주세요."
        />
      </div>
    </div>
  );
};
