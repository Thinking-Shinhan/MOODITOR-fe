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
  '1:1': 'aspect-square',
  '2:3': 'aspect-[2/3]',
  '3:4': 'aspect-[3/4]',
  '4:5': 'aspect-[4/5]',
  '9:16': 'aspect-[9/16]',
  '16:9': 'aspect-[16/9]',
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
  const cardClassName = isWideLayout
    ? `${ASPECT_RATIO_CLASS[aspectRatio]} w-full`
    : `${ASPECT_RATIO_CLASS[aspectRatio]} min-w-0 flex-1`;

  return (
    <div className="flex size-full flex-col items-center justify-center gap-[var(--gap-7)] px-[33px]">
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
            ? 'grid w-full grid-cols-2 gap-[var(--gap-4)]'
            : 'flex w-full items-start gap-[var(--gap-4)]'
        }
      >
        {images.map((image) => (
          <GeneratedImageCard
            key={image.id}
            url={image.url}
            liked={likedIds.has(image.id)}
            onToggleLike={() => handleToggleLike(image.id)}
            className={cardClassName}
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
