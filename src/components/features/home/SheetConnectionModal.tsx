'use client';

import { useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Body, Heading } from '@/components/commons/Typography';
import { Button } from '@/components/commons/Button';
import { Spinner } from '@/components/commons/Spinner';
import { Toast } from '@/components/commons/Toast';
import { useCreateSheetConnection } from '@/hooks/useCreateSheetConnection';
import { ApiError } from '@/libs/apiClient';

const SERVICE_ACCOUNT_EMAIL =
  '450502779797-compute@developer.gserviceaccount.com';

interface SheetConnectionModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const noopSubscribe = () => () => {};

const useIsClient = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

const StepBadge = ({ step }: { step: number }) => (
  <span className="bg-btn-primary-fill flex size-5 shrink-0 items-center justify-center rounded-[var(--radius-max)]">
    <Body size="xsmall" bold className="text-text-border-inverse">
      {step}
    </Body>
  </span>
);

export const SheetConnectionModal = ({
  open,
  onClose,
  onSuccess,
}: SheetConnectionModalProps) => {
  const isClient = useIsClient();
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const createSheetConnection = useCreateSheetConnection();

  if (!isClient || !open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVICE_ACCOUNT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setErrorMessage('클립보드 복사에 실패했어요. 직접 선택해 복사해주세요.');
    }
  };

  const handleClose = () => {
    setUrl('');
    setErrorMessage(null);
    onClose();
  };

  const handleConnect = () => {
    if (!url.trim()) return;

    setErrorMessage(null);
    createSheetConnection.mutate(
      { url: url.trim() },
      {
        onSuccess: () => {
          setUrl('');
          onSuccess?.();
          onClose();
        },
        onError: (error) => {
          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : '구글 시트 연동에 실패했어요. 다시 시도해주세요.',
          );
        },
      },
    );
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-gray-100)]/40"
      onClick={handleClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-bg-white flex w-[496px] flex-col items-start gap-[var(--gap-8)] rounded-[var(--radius-large2)] p-[var(--padding-8)]"
      >
        <div className="flex w-full items-center justify-between">
          <Heading size="xsmall" className="text-text-basic">
            상품 연동하기
          </Heading>
          <button
            type="button"
            onClick={handleClose}
            aria-label="닫기"
            className="text-icon-gray hover:text-icon-gray-light flex size-5 shrink-0 cursor-pointer items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex w-full flex-col items-start gap-[var(--gap-7)]">
          <div className="flex w-full flex-col items-start gap-[var(--gap-4)]">
            <div className="flex items-center gap-[var(--gap-2)]">
              <StepBadge step={1} />
              <Heading size="xsmall" className="text-text-basic">
                서비스 계정 복사
              </Heading>
            </div>
            <div className="flex w-full flex-col items-start gap-[var(--gap-3)]">
              <div className="border-border-subtle flex w-full items-center justify-between gap-[var(--gap-3)] rounded-[var(--radius-medium2)] border p-[var(--padding-4)]">
                <Body size="xsmall" className="text-text-subtler">
                  {SERVICE_ACCOUNT_EMAIL}
                </Body>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-btn-secondary-fill border-btn-secondary-border flex shrink-0 items-center justify-center rounded-[var(--radius-xsmall2)] border px-[var(--padding-4)] py-[var(--size-height-1)]"
                >
                  <Body
                    size="xsmall"
                    bold
                    className="text-text-primary-basic whitespace-nowrap"
                  >
                    {copied ? '복사됨' : '복사하기'}
                  </Body>
                </button>
              </div>
              <Body size="xsmall" bold className="text-text-subtler">
                브랜드 운영자의 구글 시트에서 서비스 계정에 뷰어 권한을 부여해
                주세요.
              </Body>
            </div>
          </div>

          <div className="border-border-subtle w-full border-t" />

          <div className="flex w-full flex-col items-start gap-[var(--gap-4)]">
            <div className="flex items-center gap-[var(--gap-2)]">
              <StepBadge step={2} />
              <Heading size="xsmall" className="text-text-basic">
                구글 시트 URL 입력
              </Heading>
            </div>
            <div className="flex w-full flex-col items-start gap-[var(--gap-3)]">
              <input
                type="text"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://구글 시트 링크를 입력해주세요."
                className="border-border-subtle text-text-basic placeholder:text-text-subtler h-[50px] w-full rounded-[var(--radius-medium2)] border p-[var(--padding-5)] text-[12px] outline-none"
              />
              <Body size="xsmall" bold className="text-text-subtler">
                상품 목록이 있는 구글 시트 URL을 붙여넣기 해주세요.
              </Body>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-[var(--gap-3)]">
          <Button
            variant="tertiary"
            size="small"
            onClick={handleClose}
            className="flex-1 rounded-[var(--radius-small1)]!"
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={handleConnect}
            disabled={!url.trim() || createSheetConnection.isPending}
            leftIcon={
              createSheetConnection.isPending ? (
                <Spinner size="small" />
              ) : undefined
            }
            className="flex-1 rounded-[var(--radius-small1)]!"
          >
            {createSheetConnection.isPending ? '연동 중...' : '연동하기'}
          </Button>
        </div>
      </div>

      <div onClick={(event) => event.stopPropagation()}>
        <Toast
          open={errorMessage !== null}
          state="error"
          message={errorMessage ?? ''}
          onClose={() => setErrorMessage(null)}
        />
      </div>
    </div>,
    document.body,
  );
};
