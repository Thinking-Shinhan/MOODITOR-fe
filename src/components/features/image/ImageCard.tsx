'use client';

import Image from 'next/image';
import { Body } from '@/components/commons/Typography';
import { Upload } from 'lucide-react';

interface ImageCardProps {
  imageUrl?: string;
  selected?: boolean;
  isUpload?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ImageCard = ({
  imageUrl,
  selected = false,
  isUpload = false,
  onClick,
  className = '',
}: ImageCardProps) => {
  if (isUpload) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`border-btn-outline-border hover:bg-bg-gray-subtler relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-(--radius-small1) border-[0.8px] border-dashed px-[13px] transition-colors ${className}`}
      >
        <Upload size={16} className="text-text-disabled-on" />
        <Body
          size="xsmall"
          className="text-text-disabled-on text-center leading-4"
        >
          이미지 업로드
        </Body>
      </button>
    );
  }

  if (imageUrl) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative h-full w-full cursor-pointer overflow-hidden rounded-(--radius-small1)${className}`}
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="200px"
          quality={60}
          className="rounded-(--radius-small1) object-cover"
        />
        {selected && (
          <div className="border-border-primary absolute inset-0 rounded-(--radius-small1) border bg-[rgba(255,94,0,0.1)]" />
        )}
      </button>
    );
  }

  return (
    <div
      className={`bg-bg-gray-subtle relative h-full w-full overflow-hidden rounded-(--radius-small1) ${className}`}
    />
  );
};
