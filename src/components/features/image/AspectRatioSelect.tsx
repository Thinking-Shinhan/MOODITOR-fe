'use client';

import { AspectRatioButton } from '@/components/commons/AspectRatioButton';
import { Body } from '@/components/commons/Typography';
import { ASPECT_RATIO_OPTIONS } from '@/constants/image-generation';

interface AspectRatioSelectProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const AspectRatioSelect = ({
  value,
  onChange,
}: AspectRatioSelectProps) => (
  <div className="flex flex-col gap-[var(--gap-4)]">
    <Body size="medium" bold className="text-text-subtle">
      이미지 비율
    </Body>
    <div className="flex gap-[var(--gap-4)]">
      {ASPECT_RATIO_OPTIONS.map((option) => (
        <AspectRatioButton
          key={option.label}
          label={option.label}
          iconClassName={option.iconClassName}
          selected={value === option.label}
          onClick={() => onChange(option.label)}
        />
      ))}
    </div>
  </div>
);
