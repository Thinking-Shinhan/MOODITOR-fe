'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import { Body } from '@/components/commons/Typography';
import { TextButton } from '@/components/commons/TextButton';
import { GeneratedImageCard } from '@/components/features/image/GeneratedImageCard';
import type { ImageAspectRatio } from '@/types/image';

interface GeneratedImage {
  id: string;
  url: string;
}

interface ImageGenerateResultCanvasProps {
  images: GeneratedImage[];
  aspectRatio: ImageAspectRatio;
}

const ASPECT_RATIO_CLASS: Record<ImageAspectRatio, string> = {
  '1:1': 'w-[160px] h-[160px]',
  '2:3': 'w-[160px] h-[240px]',
  '3:4': 'w-[160px] h-[215px]',
  '4:5': 'w-[160px] h-[200px]',
  '9:16': 'w-[160px] h-[284px]',
  '16:9': 'w-[332px] h-[186px]',
};

export const ImageGenerateResultCanvas = ({
  images,
  aspectRatio,
}: ImageGenerateResultCanvasProps) => {
  const router = useRouter();
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isWideLayout = aspectRatio === '16:9';

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

      <div
        className={
          isWideLayout
            ? 'grid w-[676px] grid-cols-2 gap-[var(--gap-4)]'
            : 'flex flex-wrap items-center justify-center gap-[var(--gap-4)]'
        }
      >
        {images.map((image) => (
          <GeneratedImageCard
            key={image.id}
            url={image.url}
            liked={likedIds.has(image.id)}
            onToggleLike={() => handleToggleLike(image.id)}
            className={ASPECT_RATIO_CLASS[aspectRatio]}
          />
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
