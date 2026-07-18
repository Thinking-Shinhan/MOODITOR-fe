'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlignLeft, Check, Expand, WandSparkles } from 'lucide-react';
import { AlertModal } from '@/components/commons/AlertModal';
import { Button } from '@/components/commons/Button';
import { Body } from '@/components/commons/Typography';
import { Toast } from '@/components/commons/Toast';
import { Tooltip } from '@/components/commons/Tooltip';
import { ProgressStepModal } from '@/components/commons/ProgressStepModal';
import { TEMPLATE_HEIGHTS } from '@/components/features/detail/DetailTemplateBlockContent';
import { useAutoPlacement } from '@/hooks/useAutoPlacement';
import { useSaveDetailPage } from '@/hooks/useSaveDetailPage';
import { useReviewCopy } from '@/hooks/useReviewCopy';
import { useFakeProgress } from '@/hooks/useFakeProgress';
import { ApiError } from '@/libs/apiClient';
import { useDetailCanvasStore } from '@/stores/detailCanvasStore';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import { useImagePlacementStore } from '@/stores/imagePlacementStore';
import { useDetailPagePreviewStore } from '@/stores/detailPagePreviewStore';
import { useTextPlacementStore } from '@/stores/textPlacementStore';
import { useCopyReviewStore } from '@/stores/copyReviewStore';
import {
  applyAutoPlacementResponse,
  buildAutoPlacementRequest,
} from '@/utils/auto-placement';
import {
  buildReviewCopyRequest,
  mapReviewCopyIssuesToItems,
} from '@/utils/reviewCopy';
import { exportDetailPageImage } from '@/utils/exportDetailPageImage';

interface DetailEditHeaderProps {
  className?: string;
}

const AUTO_PLACEMENT_RESULT_DELAY_MS = 1000;

interface ProgressChecklistDefinition {
  label: string;
  // 이 진행률(%) 이상이면 활성화 상태로 표시
  threshold: number;
}

const AUTO_PLACEMENT_CHECKLIST: ProgressChecklistDefinition[] = [
  { label: '이미지 배치 중', threshold: 1 },
  { label: 'AI 문구 생성 중', threshold: 50 },
  { label: '모든 페이지 배치 완료', threshold: 100 },
];

export const DetailEditHeader = ({ className = '' }: DetailEditHeaderProps) => {
  const router = useRouter();
  const setPreviewImageUrl = useDetailPagePreviewStore(
    (state) => state.setImageUrl,
  );
  const [autoPlaceTooltipOpen, setAutoPlaceTooltipOpen] = useState(false);
  const [reviewCopyTooltipOpen, setReviewCopyTooltipOpen] = useState(false);
  const [previewTooltipOpen, setPreviewTooltipOpen] = useState(false);
  const [saveTooltipOpen, setSaveTooltipOpen] = useState(false);
  const [exportTooltipOpen, setExportTooltipOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [autoPlacementErrorMessage, setAutoPlacementErrorMessage] = useState<
    string | null
  >(null);
  const [exportErrorMessage, setExportErrorMessage] = useState<string | null>(
    null,
  );
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [reviewCopyErrorMessage, setReviewCopyErrorMessage] = useState<
    string | null
  >(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isExportingLocal, setIsExportingLocal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const hasTemplates = useDetailCanvasStore(
    (state) => state.placedTemplates.length > 0,
  );
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const autoPlacement = useAutoPlacement();
  const saveDetailPage = useSaveDetailPage();
  const reviewCopy = useReviewCopy();
  const openCopyReviewPanel = useCopyReviewStore((state) => state.openPanel);
  const closeCopyReviewPanel = useCopyReviewStore((state) => state.closePanel);
  const setCopyReviewItems = useCopyReviewStore((state) => state.setItems);
  const setCopyReviewLoading = useCopyReviewStore((state) => state.setLoading);
  const [isAutoPlacing, setIsAutoPlacing] = useState(false);
  const {
    progress: autoPlacementProgress,
    reset: resetAutoPlacementProgress,
    complete: completeAutoPlacementProgress,
  } = useFakeProgress(isAutoPlacing);

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

    setAutoPlacementErrorMessage(null);
    resetAutoPlacementProgress();
    setIsAutoPlacing(true);

    autoPlacement.mutate(request, {
      onSuccess: (response) => {
        completeAutoPlacementProgress();
        setTimeout(() => {
          applyAutoPlacementResponse(response);
          setIsAutoPlacing(false);
          if (response.status === 'PARTIAL_SUCCESS') {
            setAutoPlacementErrorMessage(
              '일부 문구 생성에 실패했어요. 다시 시도해주세요.',
            );
          }
        }, AUTO_PLACEMENT_RESULT_DELAY_MS);
      },
      onError: () => {
        setIsAutoPlacing(false);
        setAutoPlacementErrorMessage(
          'AI 자동 배치에 실패했어요. 잠시 후 다시 시도해주세요.',
        );
      },
    });
  };

  const handleReviewCopy = () => {
    if (!selectedProduct) return;

    const { placedTemplates } = useDetailCanvasStore.getState();
    const { images } = useImagePlacementStore.getState();
    const { texts } = useTextPlacementStore.getState();

    const request = buildReviewCopyRequest({
      productId: Number(selectedProduct.id),
      placedTemplates,
      images,
      texts,
    });

    setCopyReviewItems([]);
    setCopyReviewLoading(true);
    openCopyReviewPanel();

    reviewCopy.mutate(request, {
      onSuccess: (response) => {
        setCopyReviewItems(
          mapReviewCopyIssuesToItems(response.issues, placedTemplates),
        );
        setCopyReviewLoading(false);
      },
      onError: (error) => {
        setCopyReviewLoading(false);
        closeCopyReviewPanel();
        setReviewCopyErrorMessage(
          error instanceof ApiError
            ? error.message
            : 'AI 문구 검수에 실패했어요. 잠시 후 다시 시도해주세요.',
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

  const handleSave = async () => {
    if (!selectedProduct) return;

    setIsSaving(true);
    try {
      const { placedTemplates } = useDetailCanvasStore.getState();
      const blob = await exportDetailPageImage(
        placedTemplates,
        TEMPLATE_HEIGHTS,
      );
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
          onMouseEnter={() => setAutoPlaceTooltipOpen(true)}
          onMouseLeave={() => setAutoPlaceTooltipOpen(false)}
          className="relative flex shrink-0 items-center"
        >
          <button
            type="button"
            onClick={handleAutoPlaceAll}
            disabled={!hasTemplates || !selectedProduct || isAutoPlacing}
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
              AI 자동 배치
            </Body>
          </button>
          {autoPlaceTooltipOpen && (
            <Tooltip
              text="AI가 이미지와 텍스트를 템플릿에 자동으로 배치해 드려요."
              placement="bottom"
              arrowAlign="left"
              className="absolute top-full left-0 mt-[var(--gap-3)]"
            />
          )}
        </div>
        <div
          onMouseEnter={() => setReviewCopyTooltipOpen(true)}
          onMouseLeave={() => setReviewCopyTooltipOpen(false)}
          className="relative flex shrink-0 items-center"
        >
          <button
            type="button"
            onClick={handleReviewCopy}
            disabled={!hasTemplates || !selectedProduct || reviewCopy.isPending}
            className="bg-btn-secondary-fill border-border-border hover:border-border-subtle disabled:border-border-subtle group flex shrink-0 cursor-pointer items-center gap-[var(--gap-3)] rounded-[var(--radius-max)] border px-[var(--padding-5)] py-[var(--padding-3)] disabled:cursor-not-allowed"
          >
            <AlignLeft
              size={16}
              className="text-icon-gray group-hover:text-icon-gray-light group-disabled:text-icon-disabled"
            />
            <Body
              size="small"
              bold
              className="text-text-border group-hover:text-text-subtler group-disabled:text-text-disabled"
            >
              {reviewCopy.isPending ? '검수 중...' : 'AI 문구 검수'}
            </Body>
          </button>
          {reviewCopyTooltipOpen && (
            <Tooltip
              text="AI가 문구를 검토해 브랜드 톤앤매너에 맞는 표현으로 다듬어 드려요."
              placement="bottom"
              arrowAlign="left"
              className="absolute top-full left-0 mt-[var(--gap-3)]"
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-[var(--gap-4)]">
        <div
          onMouseEnter={() => setPreviewTooltipOpen(true)}
          onMouseLeave={() => setPreviewTooltipOpen(false)}
          className="relative flex shrink-0 items-center"
        >
          <Button
            variant="secondary"
            size="large"
            disabled={!hasTemplates || isPreviewing}
            onClick={handlePreview}
            leftIcon={
              <Expand
                size={24}
                className={
                  hasTemplates
                    ? 'text-icon-primary-basic'
                    : 'text-icon-disabled'
                }
              />
            }
          />
          {previewTooltipOpen && (
            <Tooltip
              text="미리보기"
              placement="bottom"
              className="absolute top-full left-1/2 mt-[var(--gap-3)] -translate-x-1/2"
            />
          )}
        </div>
        <div
          onMouseEnter={() => setSaveTooltipOpen(true)}
          onMouseLeave={() => setSaveTooltipOpen(false)}
          className="relative flex shrink-0 items-center"
        >
          <Button
            variant="primary"
            size="medium"
            className="w-[108px]"
            disabled={!hasTemplates || !selectedProduct || isSaving}
            onClick={handleSave}
          >
            {isSaving ? '저장 중...' : '저장하기'}
          </Button>
          {saveTooltipOpen && (
            <Tooltip
              text="라이브러리에 저장"
              placement="bottom"
              className="absolute top-full left-1/2 mt-[var(--gap-3)] -translate-x-1/2"
            />
          )}
        </div>
        <div
          onMouseEnter={() => setExportTooltipOpen(true)}
          onMouseLeave={() => setExportTooltipOpen(false)}
          className="relative flex shrink-0 items-center"
        >
          <Button
            variant="primary"
            size="medium"
            className="w-[108px]"
            disabled={!hasTemplates || isExportingLocal}
            onClick={handleExportLocal}
          >
            {isExportingLocal ? '내보내는 중...' : '내보내기'}
          </Button>
          {exportTooltipOpen && (
            <Tooltip
              text="이미지로 내보내기"
              placement="bottom"
              className="absolute top-full left-1/2 mt-[var(--gap-3)] -translate-x-1/2"
            />
          )}
        </div>
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
      <Toast
        usePortal={false}
        open={saveErrorMessage !== null}
        state="error"
        message={saveErrorMessage ?? ''}
        onClose={() => setSaveErrorMessage(null)}
      />
      <Toast
        usePortal={false}
        open={reviewCopyErrorMessage !== null}
        state="error"
        message={reviewCopyErrorMessage ?? ''}
        onClose={() => setReviewCopyErrorMessage(null)}
      />
      <ProgressStepModal
        open={isAutoPlacing}
        progress={autoPlacementProgress}
        title="AI 자동 배치 중"
        description={
          '브랜드 무드를 분석해 이미지와 텍스트를\n최적의 위치에 배치하고 있어요.'
        }
        items={AUTO_PLACEMENT_CHECKLIST.map((item) => ({
          label: item.label,
          active: autoPlacementProgress >= item.threshold,
        }))}
      />
    </header>
  );
};
