'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import {
  ProgressStepCard,
  type ProgressChecklistItem,
} from '@/components/commons/ProgressStepCard';

interface ProgressStepModalProps {
  open: boolean;
  progress: number;
  title: string;
  description: string;
  items: ProgressChecklistItem[];
  completeTitle?: string;
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
  items,
  completeTitle,
}: ProgressStepModalProps) => {
  const isClient = useIsClient();

  if (!isClient || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-gray-100)]/40">
      <ProgressStepCard
        progress={progress}
        title={title}
        description={description}
        items={items}
        completeTitle={completeTitle}
      />
    </div>,
    document.body,
  );
};
