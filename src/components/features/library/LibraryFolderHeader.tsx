import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Body } from '@/components/commons/Typography';
import { PRODUCT_GENDER_LABEL } from '@/constants/product';
import type { ProductGender } from '@/types/product';

interface LibraryFolderHeaderProps {
  productName: string;
  productCode: string;
  category: string;
  color: string;
  gender: ProductGender;
}

interface InfoFieldProps {
  label: string;
  value: string;
}

const InfoField = ({ label, value }: InfoFieldProps) => (
  <div className="flex w-[140px] shrink-0 flex-col gap-[var(--gap-2)]">
    <Body size="xsmall" bold className="text-text-subtle truncate">
      {label}
    </Body>
    <Body size="xsmall" className="text-text-basic truncate">
      {value}
    </Body>
  </div>
);

export const LibraryFolderHeader = ({
  productName,
  productCode,
  category,
  color,
  gender,
}: LibraryFolderHeaderProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[var(--gap-5)]">
      <div className="flex items-center gap-[var(--gap-2)]">
        <Link href="/library">
          <Body size="xsmall" bold className="text-text-disabled">
            라이브러리
          </Body>
        </Link>
        <ChevronRight size={20} className="text-icon-disabled shrink-0" />
        <Body size="xsmall" bold className="text-text-basic">
          {productName}
        </Body>
      </div>
      <div className="bg-bg-white border-border-subtler flex w-full flex-col gap-[var(--gap-6)] rounded-[var(--radius-medium2)] border px-[var(--padding-7)] py-[var(--padding-6)]">
        <Body size="medium" bold className="text-text-basic w-full truncate">
          {productName}
        </Body>
        <div className="flex items-start gap-[var(--gap-5)]">
          <InfoField label="상품코드" value={productCode} />
          <InfoField label="카테고리" value={category} />
          <InfoField label="색상" value={color} />
          <InfoField label="대상" value={PRODUCT_GENDER_LABEL[gender]} />
        </div>
      </div>
    </div>
  );
};
