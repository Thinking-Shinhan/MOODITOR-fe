'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DetailEditHeader } from '@/components/features/detail/DetailEditHeader';
import { ImagePlacementPanel } from '@/components/features/detail/ImagePlacementPanel';
import { TemplateListPanel } from '@/components/features/detail/TemplateListPanel';
import {
  CopyReviewPanel,
  type CopyReviewItem,
} from '@/components/features/detail/CopyReviewPanel';
import { useImagePlacementStore } from '@/stores/imagePlacementStore';
import { useCopyReviewStore } from '@/stores/copyReviewStore';

const DetailEditCanvas = dynamic(
  () =>
    import('@/components/features/detail/DetailEditCanvas').then(
      (mod) => mod.DetailEditCanvas,
    ),
  { ssr: false },
);

// TODO: replace with real "문구 검수" API response once the backend endpoint exists
const MOCK_COPY_REVIEW_ITEMS: CopyReviewItem[] = [
  {
    id: '1',
    pageNumber: 1,
    subtitle: '메인 카피',
    issueTag: '어색한 표현',
    currentText:
      '최고의 퀄리티를 자랑하는 이 제품은 당신의 일상을 바꿔드립니다.',
    suggestedText:
      '뛰어난 품질로 완성된 이 제품이 당신의 일상에 변화를 더해요.',
    reason: '과장된 표현을 줄이고 자연스러운 문장으로 다듬었어요.',
    status: 'idle',
  },
  {
    id: '2',
    pageNumber: 2,
    subtitle: '상세 설명',
    issueTag: '맞춤법 오류',
    currentText: '이 제품은 오랜기간 사용하셔도 변함없는 퀄리티를 유지합니다.',
    suggestedText: '이 제품은 오랜 기간 사용하셔도 변함없는 품질을 유지해요.',
    reason: '띄어쓰기를 바로잡고 외래어를 다듬었어요.',
    status: 'idle',
  },
  {
    id: '3',
    pageNumber: 2,
    subtitle: '상세 설명',
    issueTag: '맞춤법 오류',
    currentText: '이 제품은 오랜기간 사용하셔도 변함없는 퀄리티를 유지합니다.',
    suggestedText: '이 제품은 오랜 기간 사용하셔도 변함없는 품질을 유지해요.',
    reason: '띄어쓰기를 바로잡고 외래어를 다듬었어요.',
    status: 'idle',
  },
  {
    id: '4',
    pageNumber: 2,
    subtitle: '상세 설명',
    issueTag: '맞춤법 오류',
    currentText: '이 제품은 오랜기간 사용하셔도 변함없는 퀄리티를 유지합니다.',
    suggestedText: '이 제품은 오랜 기간 사용하셔도 변함없는 품질을 유지해요.',
    reason: '띄어쓰기를 바로잡고 외래어를 다듬었어요.',
    status: 'idle',
  },
];

export default function DetailEditPage() {
  const isImagePanelOpen = useImagePlacementStore((state) => state.isPanelOpen);
  const closeImagePanel = useImagePlacementStore((state) => state.closePanel);
  const isCopyReviewPanelOpen = useCopyReviewStore(
    (state) => state.isPanelOpen,
  );
  // const isCopyReviewPanelOpen = true; // TODO: 임시로 항상 켜져있도록 설정. 추후 문구 검수 기능이 구현되면 isPanelOpen으로 변경
  const closeCopyReviewPanel = useCopyReviewStore((state) => state.closePanel);

  const [copyReviewItems, setCopyReviewItems] = useState(
    MOCK_COPY_REVIEW_ITEMS,
  );

  const handleApplyCopyReview = (id: string) => {
    setCopyReviewItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: 'applied' } : item,
      ),
    );
  };

  const handleApplyAllCopyReview = () => {
    setCopyReviewItems((items) =>
      items.map((item) => ({ ...item, status: 'applied' })),
    );
  };

  return (
    <div className="flex h-full">
      {isCopyReviewPanelOpen ? (
        <CopyReviewPanel
          items={copyReviewItems}
          onApply={handleApplyCopyReview}
          onApplyAll={handleApplyAllCopyReview}
          onClose={closeCopyReviewPanel}
          applyAllDisabled={copyReviewItems.every(
            (item) => item.status === 'applied',
          )}
        />
      ) : isImagePanelOpen ? (
        <ImagePlacementPanel onClose={closeImagePanel} />
      ) : (
        <TemplateListPanel />
      )}
      <div className="bg-bg-gray-subtler flex flex-1 transform-gpu flex-col overflow-auto">
        <DetailEditHeader className="sticky top-0 z-10 shrink-0" />
        <div className="flex flex-1 flex-col items-center px-[60px] pt-[var(--gap-9)]">
          <DetailEditCanvas />
          <div className="h-[240px] w-full shrink-0" />
        </div>
      </div>
    </div>
  );
}
