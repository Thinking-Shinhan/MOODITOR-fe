'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import {
  InputMessage,
  InputMessageState,
} from '@/components/commons/InputMessage';

interface ToastProps {
  open: boolean;
  state: InputMessageState;
  message: string;
  duration?: number;
  onClose: () => void;
  usePortal?: boolean;
}

const noopSubscribe = () => () => {};

const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export const Toast = ({
  open,
  state,
  message,
  duration = 2000,
  onClose,
  usePortal = true,
}: ToastProps) => {
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!isClient || !open) return null;

  const toast = (
    <div className="fixed bottom-[var(--gap-9)] left-1/2 z-50 -translate-x-1/2">
      <div className="bg-bg-white flex items-start rounded-[var(--radius-max)] px-[var(--padding-4)] py-[var(--padding-3)] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
        <InputMessage state={state} message={message} />
      </div>
    </div>
  );

  return usePortal ? createPortal(toast, document.body) : toast;
};
