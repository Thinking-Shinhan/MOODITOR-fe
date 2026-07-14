'use client';

import { ReactNode, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/commons/Button';
import { Body } from '@/components/commons/Typography';

interface AlertModalProps {
  open: boolean;
  title: string;
  description: string;
  icon?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const noopSubscribe = () => () => {};

const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

export const AlertModal = ({
  open,
  title,
  description,
  icon,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
}: AlertModalProps) => {
  const isClient = useIsClient();

  if (!isClient || !open) return null;

  const showCancel = Boolean(cancelText && onCancel);

  const handleBackdropClick = onCancel ?? onConfirm;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-gray-100)]/40"
      onClick={handleBackdropClick}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-bg-white flex w-[360px] flex-col items-start rounded-[var(--radius-xlarge2)] shadow-[0px_2px_8px_rgba(0,0,0,0.04)]"
      >
        <div
          className={`flex w-full flex-col items-center px-[var(--padding-6)] text-center ${
            icon
              ? 'gap-[var(--gap-3)] py-[var(--padding-9)]'
              : 'gap-[var(--gap-2)] py-[var(--padding-10)]'
          }`}
        >
          {icon && (
            <div className="bg-btn-primary-fill-black flex h-[var(--size-height-6)] w-[var(--size-height-6)] shrink-0 items-center justify-center rounded-[var(--radius-max)]">
              <div className="flex h-[var(--size-height-5)] w-[var(--size-height-5)] items-center justify-center">
                {icon}
              </div>
            </div>
          )}
          <div
            className={`flex w-full flex-col items-center ${icon ? 'gap-[var(--gap-1)]' : 'gap-[var(--gap-2)]'}`}
          >
            <Body size="large" bold className="text-text-basic w-full">
              {title}
            </Body>
            <Body
              size="small"
              className="text-text-subtler w-full whitespace-pre-wrap"
            >
              {description}
            </Body>
          </div>
        </div>
        <div className="flex w-full items-center gap-[var(--gap-3)] px-[var(--padding-6)] pb-[var(--padding-6)]">
          {showCancel && (
            <Button
              variant="tertiary"
              size="small"
              onClick={onCancel}
              className="flex-1"
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant="primary"
            size="small"
            onClick={onConfirm}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
