'use client';

import { OptionButton } from '@/components/commons/OptionButton';
import { Body } from '@/components/commons/Typography';
import { COLOR_TONE_OPTIONS } from '@/constants/image-generation';

interface ColorToneSelectProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const ColorToneSelect = ({ value, onChange }: ColorToneSelectProps) => (
  <div className="flex flex-col gap-[var(--gap-4)]">
    <Body size="medium" bold className="text-text-subtle">
      이미지 색온도
    </Body>
    <div className="flex gap-[var(--gap-4)]">
      {COLOR_TONE_OPTIONS.map((option) => (
        <OptionButton
          key={option}
          selected={value === option}
          onClick={() => onChange(option)}
          className="flex-1"
        >
          {option}
        </OptionButton>
      ))}
    </div>
  </div>
);
