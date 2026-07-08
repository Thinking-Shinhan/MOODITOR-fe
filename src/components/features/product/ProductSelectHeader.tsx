'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Heading, Body } from '@/components/commons/Typography';

export const ProductSelectHeader = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[var(--gap-2)]">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex w-fit cursor-pointer items-center gap-[var(--gap-2)]"
      >
        <ChevronLeft size={24} className="text-icon-gray" />
        <Heading size="small" className="text-text-basic">
          상품 선택
        </Heading>
      </button>
      <Body size="medium" className="text-text-subtler">
        이미지 제작 시 활용할 상품을 선택해주세요.
      </Body>
    </div>
  );
};
