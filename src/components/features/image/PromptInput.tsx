'use client';

import { Textarea } from '@/components/commons/Textarea';
import { Body } from '@/components/commons/Typography';
import { PROMPT_MAX_LENGTH } from '@/constants/image-generation';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PromptInput = ({ value, onChange }: PromptInputProps) => (
  <div className="flex flex-col gap-[var(--gap-4)]">
    <Body size="medium" bold className="text-text-subtle">
      프롬프트
    </Body>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={PROMPT_MAX_LENGTH}
      placeholder="편집하고 싶은 내용을 작성해주세요."
    />
  </div>
);
