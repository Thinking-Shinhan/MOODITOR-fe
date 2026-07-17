'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { BrandMoodAnalysisProgressCard } from '@/components/features/onboarding/BrandMoodAnalysisProgressCard';

interface BrandMoodAnalysisProgressModalProps {
  open: boolean;
  progress: number;
}

const noopSubscribe = () => () => {};

const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export const BrandMoodAnalysisProgressModal = ({
  open,
  progress,
}: BrandMoodAnalysisProgressModalProps) => {
  const isClient = useIsClient();

  if (!isClient || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-gray-100)]/40">
      <BrandMoodAnalysisProgressCard progress={progress} />
    </div>,
    document.body,
  );
};
