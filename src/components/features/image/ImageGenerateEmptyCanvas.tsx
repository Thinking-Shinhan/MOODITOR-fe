'use client';

import { ImagePlus } from 'lucide-react';
import { Body } from '@/components/commons/Typography';

export const ImageGenerateEmptyCanvas = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-[var(--size-height-4)]">
      <ImagePlus size={32} className="text-icon-disabled-on" />
      <div className="flex flex-col items-center gap-[var(--size-height-1)]">
        <Body size="medium" bold className="text-text-disabled-on">
          아직 생성된 이미지가 없어요
        </Body>
        <Body size="xsmall" className="text-text-disabled-on text-center">
          설정을 완료하고 이미지를 생성하면,
          <br />
          이곳에서 확인할 수 있어요.
        </Body>
      </div>
    </div>
  );
};
