'use client';

import { ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/commons/Checkbox';
import { Body } from '@/components/commons/Typography';

interface ProductListHeaderProps {
  allSelected: boolean;
  onToggleAll: () => void;
}

const columns = [
  { label: '카테고리', width: 'w-[65px]' },
  { label: '색상', width: 'w-[80px]' },
  { label: '대상', width: 'w-[60px]' },
];

export const ProductListHeader = ({
  allSelected,
  onToggleAll,
}: ProductListHeaderProps) => {
  return (
    <div
      className={[
        'flex w-full items-center gap-[var(--gap-8)]',
        'border-btn-tertiary-fill bg-btn-tertiary-fill border-t border-b',
        'py-[var(--padding-6)] pr-[var(--padding-4)] pl-[var(--padding-7)]',
      ].join(' ')}
    >
      <Checkbox
        size="small"
        variant="primary"
        checked={allSelected}
        onChange={onToggleAll}
      />
      <Body size="xsmall" className="w-[240px] text-[#000]">
        상품명
      </Body>
      <Body size="xsmall" className="w-[120px] text-[#000]">
        상품코드
      </Body>
      {/* TODO: 드롭다운 */}
      {columns.map((column) => (
        <div
          key={column.label}
          className={`flex shrink-0 items-center gap-[var(--gap-1)] ${column.width}`}
        >
          <Body size="xsmall" className="text-[#000]">
            {column.label}
          </Body>
          <ChevronDown size={16} className="text-icon-gray-light" />
        </div>
      ))}
    </div>
  );
};
