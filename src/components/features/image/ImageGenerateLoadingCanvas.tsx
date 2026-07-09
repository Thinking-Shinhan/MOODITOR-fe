'use client';

import { Spinner } from '@/components/commons/Spinner';
import { Body } from '@/components/commons/Typography';

export const ImageGenerateLoadingCanvas = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-[var(--size-height-4)]">
      <Spinner size="large" className="text-icon-gray" />
      <div className="flex flex-col items-center gap-[var(--size-height-1)]">
        <Body size="medium" bold className="text-text-basic">
          이미지를 생성하고 있어요
        </Body>
        <Body size="xsmall" className="text-text-basic text-center">
          선택한 설정을 반영해 이미지를 만드는 중입니다.
          <br />
          최적의 결과를 위해 잠시만 기다려 주세요.
        </Body>
      </div>
    </div>
  );
};
