'use client';

import { CircleX, TriangleAlert, CircleCheck, Loader2 } from 'lucide-react';
import { Body } from '@/components/commons/Typography';

export type InputMessageState = 'error' | 'warning' | 'success' | 'loading';

interface InputMessageProps {
  state: InputMessageState;
  message: string;
  className?: string;
}

const stateConfig: Record<
  InputMessageState,
  { icon: React.ElementType; textColor: string; spin?: boolean }
> = {
  error: { icon: CircleX, textColor: 'text-icon-danger' },
  warning: { icon: TriangleAlert, textColor: 'text-icon-warning' },
  success: { icon: CircleCheck, textColor: 'text-icon-success' },
  loading: { icon: Loader2, textColor: 'text-icon-basic', spin: true },
};

export const InputMessage = ({
  state,
  message,
  className = '',
}: InputMessageProps) => {
  const { icon: Icon, textColor, spin } = stateConfig[state];

  return (
    <div className={`flex items-center gap-[var(--gap-2)] ${className}`}>
      <Icon
        size={14}
        className={`${textColor} shrink-0 ${spin ? 'animate-spin' : ''}`}
      />
      <Body size="xsmall" bold className={textColor}>
        {message}
      </Body>
    </div>
  );
};
