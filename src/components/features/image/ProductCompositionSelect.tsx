'use client';

import { useState } from 'react';
import { SegmentControl } from '@/components/commons/SegmentControl';
import { InputMessage } from '@/components/commons/InputMessage';
import { Body } from '@/components/commons/Typography';
import { CompositionOptionCard } from '@/components/features/image/CompositionOptionCard';
import { useReferenceAssets } from '@/hooks/useReferenceAssets';
import type { ReferenceAsset } from '@/types/image';

const MAX_SELECTED_COMPOSITIONS = 4;

interface ProductCompositionSelectProps {
  showError?: boolean;
  onSelect?: (referenceAssetIds: string[]) => void;
}

export const ProductCompositionSelect = ({
  showError = false,
  onSelect,
}: ProductCompositionSelectProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const { data: shotTemplateAssets } = useReferenceAssets('SHOT_TEMPLATE');
  const compositionOptions = shotTemplateAssets?.referenceAssets ?? [];

  const handleSelect = (referenceAssetId: string) => {
    const isSelected = selected.includes(referenceAssetId);
    if (!isSelected && selected.length >= MAX_SELECTED_COMPOSITIONS) return;

    const next = isSelected
      ? selected.filter((id) => id !== referenceAssetId)
      : [...selected, referenceAssetId];
    setSelected(next);
    onSelect?.(next);
  };

  const renderGrid = (options: ReferenceAsset[]) => (
    <div className="mt-4 grid grid-cols-4 gap-[var(--gap-3)]">
      {options.map((asset) => {
        const id = String(asset.referenceAssetId);
        const isSelected = selected.includes(id);
        return (
          <CompositionOptionCard
            key={id}
            label={asset.label}
            imageUrl={asset.imageUrl}
            selected={isSelected}
            disabled={
              !isSelected && selected.length >= MAX_SELECTED_COMPOSITIONS
            }
            onClick={() => handleSelect(id)}
          />
        );
      })}
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-[var(--gap-4)]">
      <div className="flex items-center justify-between">
        <Body size="medium" bold className="text-text-subtle">
          제품 구도 선택
        </Body>
        {showError && (
          <InputMessage state="error" message="구도를 선택해 주세요." />
        )}
      </div>
      <SegmentControl
        segments={[
          // TODO: 악세서리 탭 전용 구도 목록이 API에 없어서 임시로 상하의와 동일한 목록 사용
          { label: '상하의', content: renderGrid(compositionOptions) },
          { label: '악세서리', content: renderGrid(compositionOptions) },
        ]}
      />
    </div>
  );
};
