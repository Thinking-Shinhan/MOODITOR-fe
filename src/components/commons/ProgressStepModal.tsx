'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { ProgressStepCard } from '@/components/commons/ProgressStepCard';

interface ProgressStepModalProps {
  open: boolean;
  progress: number;
  title: string;
  description: string;
  steps: string[];
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
  steps,
}: ProgressStepModalProps) => {
  const isClient = useIsClient();

  if (!isClient || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-gray-100)]/40">
      <ProgressStepCard
        progress={progress}
        title={title}
        description={description}
        steps={steps}
      />
    </div>,
    document.body,
  );
};
