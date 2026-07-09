'use client';

import { Dropdown } from '@/components/commons/Dropdown';
import { Body } from '@/components/commons/Typography';
import {
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_COLOR_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
} from '@/constants/product';

interface ProductListHeaderProps {
  categoryFilter: string | null;
  onCategoryFilterChange: (value: string | null) => void;
  colorFilter: string | null;
  onColorFilterChange: (value: string | null) => void;
  genderFilter: string | null;
  onGenderFilterChange: (value: string | null) => void;
}

export const ProductListHeader = ({
  categoryFilter,
  onCategoryFilterChange,
  colorFilter,
  onColorFilterChange,
  genderFilter,
  onGenderFilterChange,
}: ProductListHeaderProps) => {
  return (
    <div
      className={[
        'flex w-full items-center gap-[var(--gap-8)]',
        'border-btn-tertiary-fill bg-btn-tertiary-fill border-t border-b',
        'py-[var(--padding-6)] pr-[var(--padding-4)] pl-[var(--padding-7)]',
      ].join(' ')}
    >
      {/* 단일 선택 구조라 전체 선택 체크박스는 제거하고, 행 체크박스와 열을 맞추기 위한 자리만 유지 */}
      <div className="h-[14px] w-[14px] shrink-0" />
      <Body size="xsmall" className="w-[240px] text-[#000]">
        상품명
      </Body>
      <Body size="xsmall" className="w-[120px] text-[#000]">
        상품코드
      </Body>
      <Dropdown
        label="카테고리"
        options={PRODUCT_CATEGORY_OPTIONS}
        value={categoryFilter}
        onChange={onCategoryFilterChange}
        panelWidthClassName="w-[120px]"
        className="w-[65px]"
      />
      <Dropdown
        label="색상"
        options={PRODUCT_COLOR_OPTIONS}
        value={colorFilter}
        onChange={onColorFilterChange}
        panelWidthClassName="w-[120px]"
        className="w-[80px]"
      />
      <Dropdown
        label="대상"
        options={PRODUCT_GENDER_OPTIONS}
        value={genderFilter}
        onChange={onGenderFilterChange}
        panelWidthClassName="w-[79px]"
        className="w-[60px]"
      />
    </div>
  );
};
