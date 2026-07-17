'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import { Body } from '@/components/commons/Typography';
import { TextButton } from '@/components/commons/TextButton';
import { Toast } from '@/components/commons/Toast';
import { GeneratedImageCard } from '@/components/features/image/GeneratedImageCard';
import { useToggleAssetLike } from '@/hooks/useToggleAssetLike';
import type { ImageAspectRatio } from '@/types/image';

interface GeneratedImage {
  assetId: number;
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

const MAX_HEIGHT_CAP_CLASS: Record<ImageAspectRatio, string> = {
  '1:1': 'max-w-[625px]',
  '2:3': 'max-w-[416.67px]',
  '3:4': 'max-w-[468.75px]',
  '4:5': 'max-w-[500px]',
  '9:16': 'max-w-[351.56px]',
  '16:9': 'max-w-[1111.11px]',
};

export const ImageGenerateResultCanvas = ({
  images,
  aspectRatio,
}: ImageGenerateResultCanvasProps) => {
  const router = useRouter();
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const toggleLike = useToggleAssetLike();

  const flipLiked = (assetId: number, liked: boolean) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (liked) next.add(assetId);
      else next.delete(assetId);
      return next;
    });
  };

  const handleToggleLike = (assetId: number) => {
    const wasLiked = likedIds.has(assetId);
    // 응답을 기다리지 않고 즉시 반영하고, 실패하면 원래 상태로 되돌린다
    flipLiked(assetId, !wasLiked);

    toggleLike.mutate(assetId, {
      onError: () => {
        flipLiked(assetId, wasLiked);
        setErrorMessage('요청을 처리하지 못했어요. 다시 시도해주세요.');
      },
    });
  };

  const isWideLayout = aspectRatio === '16:9';
  const cardClassName = isWideLayout
    ? `${ASPECT_RATIO_CLASS[aspectRatio]} ${MAX_HEIGHT_CAP_CLASS[aspectRatio]} mx-auto w-full`
    : `${ASPECT_RATIO_CLASS[aspectRatio]} ${MAX_HEIGHT_CAP_CLASS[aspectRatio]} min-w-0 flex-1`;

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
            : 'flex w-full items-start justify-center gap-[var(--gap-4)]'
        }
      >
        {images.map((image) => (
          <GeneratedImageCard
            key={image.assetId}
            url={image.url}
            liked={likedIds.has(image.assetId)}
            onToggleLike={() => handleToggleLike(image.assetId)}
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

      <Toast
        open={errorMessage !== null}
        state="error"
        message={errorMessage ?? ''}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};
