'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Expand, WandSparkles } from 'lucide-react';
import { AlertModal } from '@/components/commons/AlertModal';
import { Button } from '@/components/commons/Button';
import { Body } from '@/components/commons/Typography';
import { Toast } from '@/components/commons/Toast';
import { Tooltip } from '@/components/commons/Tooltip';
import { TEMPLATE_HEIGHTS } from '@/components/features/detail/DetailTemplateBlockContent';
import { useAutoPlacement } from '@/hooks/useAutoPlacement';
import { useDetailCanvasStore } from '@/stores/detailCanvasStore';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import { useImagePlacementStore } from '@/stores/imagePlacementStore';
import { useDetailPagePreviewStore } from '@/stores/detailPagePreviewStore';
import { useTextPlacementStore } from '@/stores/textPlacementStore';
import {
  applyAutoPlacementResponse,
  buildAutoPlacementRequest,
} from '@/utils/auto-placement';
import { exportDetailPageImage } from '@/utils/exportDetailPageImage';

interface DetailEditHeaderProps {
  className?: string;
}

export const DetailEditHeader = ({ className = '' }: DetailEditHeaderProps) => {
  const router = useRouter();
  const setPreviewImageUrl = useDetailPagePreviewStore(
    (state) => state.setImageUrl,
  );
  const [aiTooltipOpen, setAiTooltipOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [autoPlacementErrorMessage, setAutoPlacementErrorMessage] = useState<
    string | null
  >(null);
  const [exportErrorMessage, setExportErrorMessage] = useState<string | null>(
    null,
  );
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isExportingLocal, setIsExportingLocal] = useState(false);
  const hasTemplates = useDetailCanvasStore(
    (state) => state.placedTemplates.length > 0,
  );
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const autoPlacement = useAutoPlacement();

  const handleAutoPlaceAll = () => {
    if (!selectedProduct) return;

    const { placedTemplates } = useDetailCanvasStore.getState();
    const { images } = useImagePlacementStore.getState();
    const { texts } = useTextPlacementStore.getState();

    const request = buildAutoPlacementRequest({
      productId: Number(selectedProduct.id),
      mode: 'REGENERATE_ALL',
      placedTemplates,
      images,
      texts,
    });

    autoPlacement.mutate(request, {
      onSuccess: (response) => {
        applyAutoPlacementResponse(response);
        if (response.status === 'PARTIAL_SUCCESS') {
          setAutoPlacementErrorMessage(
            '일부 문구 생성에 실패했어요. 다시 시도해주세요.',
          );
        }
      },
      onError: () => {
        setAutoPlacementErrorMessage(
          'AI 자동 배치에 실패했어요. 잠시 후 다시 시도해주세요.',
        );
      },
    });
  };

  const handlePreview = async () => {
    setIsPreviewing(true);
    try {
      const { placedTemplates } = useDetailCanvasStore.getState();
      const blob = await exportDetailPageImage(
        placedTemplates,
        TEMPLATE_HEIGHTS,
      );
      setPreviewImageUrl(URL.createObjectURL(blob));
      router.push('/detail-edit/preview');
    } catch {
      setExportErrorMessage('미리보기를 불러오지 못했어요. 다시 시도해주세요.');
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleExportLocal = async () => {
    setIsExportingLocal(true);
    try {
      const { placedTemplates } = useDetailCanvasStore.getState();
      const blob = await exportDetailPageImage(
        placedTemplates,
        TEMPLATE_HEIGHTS,
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `상세페이지-${
        selectedProduct?.name ?? '상품'
      }-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
      setExportModalOpen(true);
    } catch {
      setExportErrorMessage('이미지 내보내기에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsExportingLocal(false);
    }
  };

  return (
    <header
      className={`bg-bg-white border-border-subtle flex items-center justify-between border-b p-[var(--padding-7)] ${className}`}
    >
      <div className="flex items-center gap-[var(--gap-3)]">
        <div
          onMouseEnter={() => setAiTooltipOpen(true)}
          onMouseLeave={() => setAiTooltipOpen(false)}
          className="relative flex shrink-0 items-center"
        >
          <button
            type="button"
            onClick={handleAutoPlaceAll}
            disabled={
              !hasTemplates || !selectedProduct || autoPlacement.isPending
            }
            className="bg-btn-secondary-fill border-border-border hover:border-border-subtle disabled:border-border-subtle group flex cursor-pointer items-center gap-[var(--gap-3)] rounded-[var(--radius-max)] border px-[var(--padding-5)] py-[var(--padding-3)] disabled:cursor-not-allowed"
          >
            <WandSparkles
              size={16}
              className="text-icon-gray group-hover:text-icon-gray-light group-disabled:text-icon-disabled"
            />
            <Body
              size="small"
              bold
              className="text-text-border group-hover:text-text-subtler group-disabled:text-text-disabled"
            >
              {autoPlacement.isPending ? '배치 중...' : 'AI 자동 배치'}
            </Body>
          </button>
          {aiTooltipOpen && (
            <Tooltip
              text="이미지와 텍스트를 모두 배치하면 더 완성도가 높아져요."
              placement="right"
              className="absolute top-1/2 left-full ml-[var(--gap-3)] -translate-y-1/2"
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-[var(--gap-4)]">
        <Button
          variant="secondary"
          size="large"
          disabled={!hasTemplates || isPreviewing}
          onClick={handlePreview}
          leftIcon={
            <Expand
              size={24}
              className={
                hasTemplates ? 'text-icon-primary-basic' : 'text-icon-disabled'
              }
            />
          }
        />
        <Button
          variant="primary"
          size="medium"
          className="w-[108px]"
          disabled={!hasTemplates}
          onClick={() => setSaveModalOpen(true)}
        >
          저장하기
        </Button>
        <Button
          variant="primary"
          size="medium"
          className="w-[108px]"
          disabled={!hasTemplates || isExportingLocal}
          onClick={handleExportLocal}
        >
          {isExportingLocal ? '내보내는 중...' : '내보내기'}
        </Button>
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
        usePortal={false}
        open={autoPlacementErrorMessage !== null}
        state="error"
        message={autoPlacementErrorMessage ?? ''}
        onClose={() => setAutoPlacementErrorMessage(null)}
      />
      <Toast
        usePortal={false}
        open={exportErrorMessage !== null}
        state="error"
        message={exportErrorMessage ?? ''}
        onClose={() => setExportErrorMessage(null)}
      />
    </header>
  );
};
