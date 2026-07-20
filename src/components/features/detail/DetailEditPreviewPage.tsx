'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Minimize2, X } from 'lucide-react';
import { AlertModal } from '@/components/commons/AlertModal';
import { Button } from '@/components/commons/Button';
import { Body } from '@/components/commons/Typography';
import { Toast } from '@/components/commons/Toast';
import { useSaveDetailPage } from '@/hooks/useSaveDetailPage';
import { ApiError } from '@/libs/apiClient';
import { useDetailPagePreviewStore } from '@/stores/detailPagePreviewStore';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';

export const DetailEditPreviewPage = () => {
  const router = useRouter();
  const imageUrl = useDetailPagePreviewStore((state) => state.imageUrl);
  const source = useDetailPagePreviewStore((state) => state.source);
  const isFromLibrary = source === 'library';
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const saveDetailPage = useSaveDetailPage();

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [exportErrorMessage, setExportErrorMessage] = useState<string | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isExportingLocal, setIsExportingLocal] = useState(false);

  const handleClose = () => {
    if (isFromLibrary) {
      router.back();
    } else {
      router.push('/detail-edit');
    }
  };

  const handleSave = async () => {
    if (!imageUrl || !selectedProduct) return;

    setIsSaving(true);
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File(
        [blob],
        `상세페이지-${selectedProduct.name}-${Date.now()}.png`,
        { type: 'image/png' },
      );
      await saveDetailPage.mutateAsync({
        productId: Number(selectedProduct.id),
        file,
      });
      setSaveModalOpen(true);
    } catch (error) {
      setSaveErrorMessage(
        error instanceof ApiError
          ? error.message
          : '상세페이지 저장에 실패했어요. 다시 시도해주세요.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportLocal = async () => {
    if (!imageUrl) return;

    setIsExportingLocal(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `상세페이지-${
        selectedProduct?.name ?? '상품'
      }-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      setExportModalOpen(true);
    } catch {
      setExportErrorMessage('이미지 내보내기에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsExportingLocal(false);
    }
  };

  return (
    <div className="bg-bg-inverse flex min-h-screen w-full flex-col">
      <header className="bg-bg-white sticky top-0 z-10 flex items-center justify-between py-[var(--padding-7)] pr-[var(--padding-7)] pl-[var(--padding-9)] shadow-[0px_4px_6px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={handleClose}
          aria-label="미리보기 닫기"
          className="text-icon-gray hover:text-icon-gray-light flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center transition-colors"
        >
          <X size={24} />
        </button>
        <div className="flex items-center gap-[var(--gap-4)]">
          {!isFromLibrary && (
            <Button
              variant="secondary"
              size="large"
              onClick={handleClose}
              leftIcon={
                <Minimize2 size={24} className="text-icon-primary-basic" />
              }
            />
          )}
          {!isFromLibrary && (
            <Button
              variant="primary"
              size="medium"
              className="w-[108px]"
              disabled={!imageUrl || !selectedProduct}
              loading={isSaving}
              onClick={handleSave}
            >
              {isSaving ? '저장 중...' : '저장하기'}
            </Button>
          )}
          <Button
            variant="primary"
            size="medium"
            className="w-[108px]"
            disabled={!imageUrl}
            loading={isExportingLocal}
            onClick={handleExportLocal}
          >
            {isExportingLocal ? '내보내는 중...' : '내보내기'}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="상세페이지 미리보기" className="w-[879px]" />
        ) : (
          <Body size="medium" className="text-text-border-inverse">
            미리보기 이미지를 찾을 수 없어요. 편집 화면에서 다시 시도해주세요.
          </Body>
        )}
      </div>

      <AlertModal
        open={saveModalOpen}
        title="저장 완료!"
        description="저장한 이미지는 라이브러리에서 확인할 수 있어요."
        icon={
          <Check size={20} strokeWidth={1.3} className="text-icon-inverse" />
        }
        onConfirm={() => setSaveModalOpen(false)}
      />
      <AlertModal
        open={exportModalOpen}
        title="내보내기 완료!"
        description="이미지를 성공적으로 내보냈어요."
        icon={
          <Check size={20} strokeWidth={1.3} className="text-icon-inverse" />
        }
        onConfirm={() => setExportModalOpen(false)}
      />
      <Toast
        open={saveErrorMessage !== null}
        state="error"
        message={saveErrorMessage ?? ''}
        onClose={() => setSaveErrorMessage(null)}
      />
      <Toast
        open={exportErrorMessage !== null}
        state="error"
        message={exportErrorMessage ?? ''}
        onClose={() => setExportErrorMessage(null)}
      />
    </div>
  );
};
