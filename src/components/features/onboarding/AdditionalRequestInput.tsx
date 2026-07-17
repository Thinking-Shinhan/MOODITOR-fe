'use client';

import { Textarea } from '@/components/commons/Textarea';

const ADDITIONAL_REQUEST_MAX_LENGTH = 500;

const ADDITIONAL_REQUEST_PLACEHOLDER = `( 예시 )
• 브랜드의 프리미엄 이미지를 강조해 주세요.
• 미니멀하고 깔끔한 디자인을 선호해요.
• 과장된 표현보다는 신뢰감 있는 문구를 사용해 주세요.`;

interface AdditionalRequestInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const AdditionalRequestInput = ({
  value,
  onChange,
}: AdditionalRequestInputProps) => (
  <div className="w-[660px]">
    <Textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      maxLength={ADDITIONAL_REQUEST_MAX_LENGTH}
      placeholder={ADDITIONAL_REQUEST_PLACEHOLDER}
    />
  </div>
);
