'use client';

import { FileUp } from 'lucide-react';
import { Body } from '@/components/commons/Typography';

export const ProductImageUploadEmptyState = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-[var(--size-height-4)]">
      <FileUp size={32} className="text-icon-disabled-on" />
      <div className="flex flex-col items-center gap-[var(--size-height-1)]">
        <Body size="medium" bold className="text-text-disabled-on">
          상세 상품 이미지 업로드
        </Body>
        <Body size="xsmall" className="text-text-disabled-on text-center">
          상품을 선택한 후, 상세 이미지를 업로드해주세요.
        </Body>
      </div>
    </div>
  );
};
