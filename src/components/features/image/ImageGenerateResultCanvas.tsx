'use client';

import { useRouter } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import { Body } from '@/components/commons/Typography';
import { TextButton } from '@/components/commons/TextButton';

interface ImageGenerateResultCanvasProps {
  images: string[];
}

export const ImageGenerateResultCanvas = ({
  images,
}: ImageGenerateResultCanvasProps) => {
  const router = useRouter();

  return (
    <div className="flex size-full flex-col items-center justify-center gap-[var(--gap-7)]">
      <div className="flex flex-col items-center gap-[var(--size-height-4)]">
        <div className="bg-icon-primary-basic flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-max)]">
          <Check size={18} className="text-icon-inverse" />
        </div>
        <div className="flex flex-col items-center gap-[var(--size-height-1)]">
          <Body size="medium" bold className="text-text-basic">
            이미지 생성이 완료되었어요
          </Body>
          <Body size="xsmall" className="text-text-basic text-center">
            자세한 이미지는 라이브러리에서 확인할 수 있어요.
          </Body>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-[var(--gap-4)]">
        {images.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className="h-[215px] w-[160px] shrink-0 overflow-hidden rounded-[var(--radius-small1)]"
          >
            <img
              src={imageUrl}
              alt={`생성된 이미지 ${index + 1}`}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      <TextButton
        size="xsmall"
        rightIcon={<ChevronRight size={16} />}
        onClick={() => router.push('/library')}
        className="text-text-disabled!"
      >
        라이브러리 가기
      </TextButton>
    </div>
  );
};
