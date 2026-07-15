'use client';

import { DragEvent, Fragment, useState } from 'react';
import { Dropdown } from '@/components/commons/Dropdown';
import { Body, Heading } from '@/components/commons/Typography';
import { ProductSelect } from '@/components/features/image/ProductSelect';
import { ProductSelectModal } from '@/components/features/detail/ProductSelectModal';
import { TemplateThumbnailCard } from '@/components/features/detail/TemplateThumbnailCard';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import type { DetailTemplate, DetailTemplateType } from '@/types/template';

const PRODUCT_SELECT_EMPTY_STATE_LINES: [string, string] = [
  '상품 리스트에서 상세페이지 제작 시',
  '활용할 상품을 선택해주세요.',
];

const TEMPLATE_LABELS: Record<DetailTemplateType, string> = {
  IMAGE_1_1: '이미지 1장 (세로)',
  IMAGE_1_2: '이미지 1장 (가로)',
  IMAGE_2_1: '이미지 2장 (가로 배치)',
  IMAGE_2_2: '이미지 2장 (세로 배치)',
  IMAGE_3_1: '이미지 3장 (2단 + 1단)',
  IMAGE_3_2: '이미지 3장 (1단 + 2단)',
  IMAGE_4_1: '이미지 4장 (2x2, 세로형)',
  IMAGE_4_2: '이미지 4장 (2x2, 가로형)',
  TEXT_1: '텍스트 1줄',
  TEXT_2: '텍스트 2줄',
  TEXT_3: '텍스트 3줄',
  TEXT_4: '텍스트 4줄',
  TEXT_5: '텍스트 5줄',
  MATERIAL: '소재 인포메이션',
  SIZE_TIP: '사이즈 팁',
  SIZE_INFO: '사이즈 인포메이션',
};

const TEMPLATE_GROUPS: { label: string; types: DetailTemplateType[] }[] = [
  {
    label: '이미지 템플릿',
    types: [
      'IMAGE_1_1',
      'IMAGE_1_2',
      'IMAGE_2_1',
      'IMAGE_2_2',
      'IMAGE_3_1',
      'IMAGE_3_2',
      'IMAGE_4_1',
      'IMAGE_4_2',
    ],
  },
  {
    label: '텍스트 템플릿',
    types: ['TEXT_1', 'TEXT_2', 'TEXT_3', 'TEXT_4', 'TEXT_5'],
  },
  {
    label: '소재 인포메이션 템플릿',
    types: ['MATERIAL'],
  },
  {
    label: '사이즈 인포메이션 템플릿',
    types: ['SIZE_TIP', 'SIZE_INFO'],
  },
];

const FILTER_OPTIONS = TEMPLATE_GROUPS.map((group) => ({
  label: group.label,
  value: group.label,
}));

const handleDragStart = (
  event: DragEvent<HTMLDivElement>,
  template: DetailTemplate,
) => {
  event.dataTransfer.setData('application/json', JSON.stringify(template));
  event.dataTransfer.effectAllowed = 'copy';
};

export const TemplateListPanel = () => {
  const [groupFilter, setGroupFilter] = useState<string | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const selectedProduct = useDetailProductSelectionStore(
    (state) => state.selectedProduct,
  );
  const clearProduct = useDetailProductSelectionStore(
    (state) => state.clearProduct,
  );

  const visibleGroups = groupFilter
    ? TEMPLATE_GROUPS.filter((group) => group.label === groupFilter)
    : TEMPLATE_GROUPS;

  return (
    <div className="border-border-subtler bg-bg-white flex w-[380px] shrink-0 flex-col gap-[var(--gap-8)] overflow-y-auto border-r p-[var(--padding-9)]">
      <ProductSelect
        selectedProducts={selectedProduct ? [selectedProduct] : []}
        maxSelected={1}
        subtitle="상세페이지에 사용할 상품을 선택해주세요."
        emptyStateLines={PRODUCT_SELECT_EMPTY_STATE_LINES}
        onClickSelectArea={() => setIsProductModalOpen(true)}
        onRemoveProduct={clearProduct}
      />
      {isProductModalOpen && (
        <ProductSelectModal onClose={() => setIsProductModalOpen(false)} />
      )}
      <div className="border-border-subtler border-t" />
      <div className="flex flex-col gap-[var(--gap-5)]">
        <div className="flex flex-col gap-[var(--gap-2)]">
          <Heading size="xsmall" className="text-text-subtle">
            템플릿 구성
          </Heading>
          <Body size="xsmall" className="text-text-subtler">
            상세페이지에 사용할 템플릿을 선택해주세요.
          </Body>
        </div>
        <Dropdown
          label={groupFilter ?? '모든 템플릿'}
          options={FILTER_OPTIONS}
          value={groupFilter}
          onChange={setGroupFilter}
          className="w-full"
          panelWidthClassName="w-full"
          panelGapClassName="mt-[var(--gap-3)]"
          triggerClassName="bg-btn-tertiary-fill w-full justify-between rounded-[var(--radius-xsmall2)] px-[var(--padding-4)] py-[var(--size-height-2)]"
          labelClassName="text-text-subtler"
          labelBold
        />
      </div>
      {visibleGroups.map((group, index) => (
        <Fragment key={group.label}>
          {index > 0 && <div className="border-border-subtler border-t" />}
          <div className="flex flex-col gap-[var(--gap-4)]">
            <Body size="medium" bold className="text-text-subtle">
              {group.label}
            </Body>
            <div className="flex flex-col gap-[var(--gap-5)]">
              {group.types.map((type) => {
                const template: DetailTemplate = {
                  id: type,
                  type,
                  label: TEMPLATE_LABELS[type],
                };
                return (
                  <TemplateThumbnailCard
                    key={type}
                    type={type}
                    label={template.label}
                    draggable
                    onDragStart={(event) => handleDragStart(event, template)}
                  />
                );
              })}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};
