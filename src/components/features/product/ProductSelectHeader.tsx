'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Heading } from '@/components/commons/Typography';

const SHOT_TYPE_LABEL: Record<string, string> = {
  model: '모델컷',
  product: '제품컷',
};

export const ProductSelectHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shotTypeLabel =
    SHOT_TYPE_LABEL[searchParams.get('shotType') ?? ''] ?? '제품컷';

  return (
    <div className="flex items-center gap-[var(--gap-2)]">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-text-disabled hover:text-text-subtler cursor-pointer whitespace-nowrap"
      >
        <Heading size="xxsmall">{shotTypeLabel}</Heading>
      </button>
      <ChevronRight size={16} className="text-icon-disabled shrink-0" />
      <button
        type="button"
        onClick={() => router.back()}
        className="text-text-disabled hover:text-text-subtler cursor-pointer whitespace-nowrap"
      >
        <Heading size="xxsmall">이미지 구성</Heading>
      </button>
      <ChevronRight size={16} className="text-icon-disabled shrink-0" />
      <Heading size="xxsmall" className="text-text-basic whitespace-nowrap">
        상품 선택
      </Heading>
    </div>
  );
};
