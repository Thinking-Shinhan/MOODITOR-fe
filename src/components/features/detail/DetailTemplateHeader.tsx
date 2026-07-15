'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { AlertModal } from '@/components/commons/AlertModal';
import { Body } from '@/components/commons/Typography';
import { Toast } from '@/components/commons/Toast';
import { isAutoPlaceableTemplateType } from '@/constants/auto-placement';
import { useAutoPlacement } from '@/hooks/useAutoPlacement';
import { useDetailCanvasStore } from '@/stores/detailCanvasStore';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import { useImagePlacementStore } from '@/stores/imagePlacementStore';
import { useTextPlacementStore } from '@/stores/textPlacementStore';
import {
  applyAutoPlacementResponse,
  buildAutoPlacementRequest,
} from '@/utils/auto-placement';
import type { DetailTemplateType } from '@/types/template';

interface DetailTemplateHeaderProps {
  templateId: string;
  templateType: DetailTemplateType;
  pageNumber: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  moveUpDisabled: boolean;
  moveDownDisabled: boolean;
  onDelete: () => void;
}

export const DetailTemplateHeader = ({
  templateId,
  templateType,
  pageNumber,
  onMoveUp,
  onMoveDown,
  moveUpDisabled,
  moveDownDisabled,
  onDelete,
}: DetailTemplateHeaderProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [autoEditErrorMessage, setAutoEditErrorMessage] = useState<
    string | null
  >(null);
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const autoPlacement = useAutoPlacement();

  // MATERIAL/SIZE_TIP은 애초에 자동 배치 요청 대상에서 빠지는 타입이라
  // targetInstanceKey로 지정해도 백엔드가 못 찾는다 (400 에러) — 버튼을 비활성화한다
  const canAutoEdit = isAutoPlaceableTemplateType(templateType);

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    onDelete();
  };

  const handleAutoEdit = () => {
    if (!selectedProduct || !canAutoEdit) return;

    const { placedTemplates } = useDetailCanvasStore.getState();
    const { images } = useImagePlacementStore.getState();
    const { texts } = useTextPlacementStore.getState();

    const request = buildAutoPlacementRequest({
      productId: Number(selectedProduct.id),
      mode: 'REGENERATE_TEMPLATE',
      targetInstanceKey: templateId,
      placedTemplates,
      images,
      texts,
    });

    autoPlacement.mutate(request, {
      onSuccess: (response) => {
        applyAutoPlacementResponse(response);
        if (response.status === 'PARTIAL_SUCCESS') {
          setAutoEditErrorMessage(
            '일부 문구 생성에 실패했어요. 다시 시도해주세요.',
          );
        }
      },
      onError: () => {
        setAutoEditErrorMessage(
          'AI 수정에 실패했어요. 잠시 후 다시 시도해주세요.',
        );
      },
    });
  };

  return (
    <div className="flex w-full items-center justify-between py-[var(--padding-3)]">
      <button
        type="button"
        onClick={handleAutoEdit}
        disabled={!canAutoEdit || !selectedProduct || autoPlacement.isPending}
        className="bg-btn-tertiary-fill flex cursor-pointer items-center justify-center gap-[var(--gap-1)] rounded-[var(--radius-xsmall2)] px-[var(--padding-4)] py-[var(--size-height-2)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Body size="xsmall" bold className="text-text-subtler">
          {autoPlacement.isPending ? '수정 중...' : 'AI 수정하기'}
        </Body>
      </button>
      <div className="flex items-center gap-[var(--gap-3)]">
        <div className="flex items-center gap-[var(--gap-1)]">
          <Body size="small" className="text-text-basic">
            페이지
          </Body>
          <Body size="small" className="text-text-basic">
            {pageNumber}
          </Body>
        </div>
        <button
          type="button"
          onClick={onMoveUp}
          disabled={moveUpDisabled}
          onPointerDown={(event) => event.stopPropagation()}
          className="flex size-[20px] cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronUp size={20} className="text-icon-gray-light" />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={moveDownDisabled}
          onPointerDown={(event) => event.stopPropagation()}
          className="flex size-[20px] cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronDown size={20} className="text-icon-gray-light" />
        </button>
        <button
          type="button"
          onClick={() => setDeleteModalOpen(true)}
          onPointerDown={(event) => event.stopPropagation()}
          className="flex size-[20px] cursor-pointer items-center justify-center"
        >
          <Trash2 size={20} className="text-icon-gray-light" />
        </button>
      </div>

      <AlertModal
        open={deleteModalOpen}
        title="해당 페이지를 삭제하시겠어요?"
        description={
          '작성한 페이지의 세부 내용이 모두 삭제되며,\n삭제된 내용은 복구할 수 없습니다.'
        }
        cancelText="취소"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <Toast
        usePortal={false}
        open={autoEditErrorMessage !== null}
        state="error"
        message={autoEditErrorMessage ?? ''}
        onClose={() => setAutoEditErrorMessage(null)}
      />
    </div>
  );
};
