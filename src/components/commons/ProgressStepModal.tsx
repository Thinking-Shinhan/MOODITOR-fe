'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { ProgressStepCard } from '@/components/commons/ProgressStepCard';
import type { ImageGenerationProgressItem } from '@/types/imageGenerationJob';

interface ProgressStepModalProps {
  open: boolean;
  progress: number;
  title: string;
  description: string;
  progressItems: ImageGenerationProgressItem[];
}

const noopSubscribe = () => () => {};

const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export const ProgressStepModal = ({
  open,
  progress,
  title,
  description,
  progressItems,
}: ProgressStepModalProps) => {
  const isClient = useIsClient();

  if (!isClient || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-gray-100)]/40">
      <ProgressStepCard
        progress={progress}
        title={title}
        description={description}
        progressItems={progressItems}
      />
    </div>,
    document.body,
  );
};
