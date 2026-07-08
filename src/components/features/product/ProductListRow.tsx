'use client';

import { Plus } from 'lucide-react';
import { Checkbox } from '@/components/commons/Checkbox';
import { Body } from '@/components/commons/Typography';
import { PRODUCT_GENDER_LABEL } from '@/constants/product';
import type { Product } from '@/types/product';

interface ProductListRowProps {
  product: Product;
  selected: boolean;
  onToggle: (id: number) => void;
}

export const ProductListRow = ({
  product,
  selected,
  onToggle,
}: ProductListRowProps) => {
  return (
    <div
      className={[
        'flex w-full items-center gap-[var(--gap-8)]',
        'border-btn-tertiary-fill-hovered border-b',
        'py-[var(--padding-6)] pr-[var(--padding-4)] pl-[var(--padding-7)]',
        selected
          ? 'bg-btn-secondary-fill-hovered'
          : 'hover:bg-btn-tertiary-fill-hovered',
      ].join(' ')}
    >
      <Checkbox
        size="small"
        variant="primary"
        checked={selected}
        onChange={() => onToggle(product.id)}
      />
      <div className="flex shrink-0 items-center gap-[var(--gap-5)]">
        <span className="bg-btn-secondary-fill-pressed flex h-[var(--size-height-6)] w-[var(--size-height-6)] shrink-0 items-center justify-center rounded-[var(--radius-xsmall2)] p-[5px]">
          <Plus size={14} className="text-icon-primary-basic" />
        </span>
        <Body size="xsmall" className="text-text-basic w-[200px] truncate">
          {product.name}
        </Body>
      </div>
      <Body size="xsmall" className="text-text-basic w-[120px] truncate">
        {product.code}
      </Body>
      <Body size="xsmall" className="text-text-basic w-[65px] truncate">
        {product.category}
      </Body>
      <Body size="xsmall" className="text-text-basic w-[80px] truncate">
        {product.color}
      </Body>
      <Body size="xsmall" className="text-text-basic w-[60px] truncate">
        {PRODUCT_GENDER_LABEL[product.gender]}
      </Body>
    </div>
  );
};
