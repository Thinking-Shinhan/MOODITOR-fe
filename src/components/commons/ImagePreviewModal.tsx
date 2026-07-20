'use client';

import { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { X, Download } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/commons/Button';
import { Toast } from '@/components/commons/Toast';
import { Heading } from '@/components/commons/Typography';

interface ImagePreviewModalProps {
  open: boolean;
  imageUrl: string;
  fileName: string;
  onClose: () => void;
}

const noopSubscribe = () => () => {};

const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export const ImagePreviewModal = ({
  open,
  imageUrl,
  fileName,
  onClose,
}: ImagePreviewModalProps) => {
  const isClient = useIsClient();
  const [isExporting, setIsExporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isClient || !open) return null;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      setErrorMessage('이미지를 저장하지 못했어요. 다시 시도해주세요.');
    } finally {
      setIsExporting(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-gray-100)]/40"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-bg-white flex w-[935px] flex-col items-center gap-[var(--gap-8)] rounded-[var(--radius-large2)] p-[var(--padding-9)] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]"
      >
        <div className="flex w-full items-center justify-between">
          <Heading size="small" className="text-text-basic">
            저장된 이미지
          </Heading>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-icon-gray cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="relative h-[675px] w-[871px] shrink-0">
          <Image
            src={imageUrl}
            alt="저장된 이미지"
            fill
            sizes="871px"
            className="object-contain"
          />
        </div>

        <Button
          variant="primary"
          size="small"
          className="w-full"
          leftIcon={<Download size={16} />}
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? '내보내는 중...' : '내보내기'}
        </Button>
      </div>

      <Toast
        open={errorMessage !== null}
        state="error"
        message={errorMessage ?? ''}
        onClose={() => setErrorMessage(null)}
      />
    </div>,
    document.body,
  );
};
