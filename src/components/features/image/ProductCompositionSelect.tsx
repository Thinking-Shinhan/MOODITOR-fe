'use client';

import { useState } from 'react';
import { SegmentControl } from '@/components/commons/SegmentControl';
import { InputMessage } from '@/components/commons/InputMessage';
import { Body } from '@/components/commons/Typography';
import { CompositionOptionCard } from '@/components/features/image/CompositionOptionCard';

// TODO: 실제 구도 예시 이미지 API 연동 전까지 임시 플레이스홀더
const PLACEHOLDER_IMAGE_URL =
  'https://i.pinimg.com/736x/96/91/51/9691510a2aae7a086a84824efd63d17a.jpg';

const TOP_BOTTOM_OPTIONS = [
  '정면',
  '사선',
  '측면',
  '후면',
  '플렛레이',
  '폴딩',
  '고스트 마네킹',
  '행잉',
  '원단 확대',
  '로고 디테일',
  '봉제 디테일',
  '실측 가이드',
];

// TODO: 악세서리 탭 옵션 목록이 Figma에 없어서 임시로 상하의와 동일한 목록 사용
const ACCESSORY_OPTIONS = TOP_BOTTOM_OPTIONS;

interface ProductCompositionSelectProps {
  showError?: boolean;
  onSelect?: (label: string | null) => void;
}

export const ProductCompositionSelect = ({
  showError = false,
  onSelect,
}: ProductCompositionSelectProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    const next = selected === label ? null : label;
    setSelected(next);
    onSelect?.(next);
  };

  const renderGrid = (options: string[]) => (
    <div className="mt-4 grid grid-cols-4 gap-[var(--gap-3)]">
      {options.map((label) => (
        <CompositionOptionCard
          key={label}
          label={label}
          imageUrl={PLACEHOLDER_IMAGE_URL}
          selected={selected === label}
          onClick={() => handleSelect(label)}
        />
      ))}
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
          { label: '상하의', content: renderGrid(TOP_BOTTOM_OPTIONS) },
          { label: '악세서리', content: renderGrid(ACCESSORY_OPTIONS) },
        ]}
      />
    </div>
  );
};
