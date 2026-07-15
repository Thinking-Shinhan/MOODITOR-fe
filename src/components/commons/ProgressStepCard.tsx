import { Check } from 'lucide-react';
import { ProgressRing } from '@/components/commons/ProgressRing';
import { Heading, Body } from '@/components/commons/Typography';

interface ProgressStepCardProps {
  progress: number;
  title: string;
  description: string;
  steps: string[];
  className?: string;
}

export const ProgressStepCard = ({
  progress,
  title,
  description,
  steps,
  className = '',
}: ProgressStepCardProps) => {
  const clamped = Math.min(100, Math.max(0, progress));
  const completedCount =
    steps.length === 0
      ? 0
      : Math.min(steps.length, Math.floor((clamped / 100) * steps.length));

  return (
    <div
      className={`bg-bg-white flex w-[480px] flex-col items-center gap-[var(--gap-9)] rounded-[var(--radius-large2)] p-[var(--padding-10)] ${className}`}
    >
      <div className="flex w-full flex-col items-center gap-[var(--gap-7)]">
        <ProgressRing progress={clamped} />
        <div className="flex w-full flex-col items-center gap-[var(--gap-2)] text-center">
          <Heading size="medium" className="text-text-basic w-full">
            {title}
          </Heading>
          <Body
            size="medium"
            className="text-text-subtler w-full whitespace-pre-line"
          >
            {description}
          </Body>
        </div>
      </div>
      <div className="flex w-[193px] flex-col items-start gap-[var(--gap-4)]">
        {steps.map((step, index) => {
          const completed = index < completedCount;

          return (
            <div
              key={step}
              className={[
                'flex w-full items-center gap-[var(--gap-3)] rounded-[var(--radius-max)] border-[0.5px] py-[var(--padding-3)] pr-[var(--padding-5)] pl-[var(--padding-4)]',
                'bg-bg-white drop-shadow-[0px_2px_4px_rgba(0,0,0,0.04)]',
                completed
                  ? 'border-btn-secondary-border'
                  : 'border-btn-outline-border',
              ].join(' ')}
            >
              <span
                className={`flex size-7 h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  completed ? 'bg-icon-primary-basic' : 'bg-icon-disabled'
                }`}
              >
                <Check
                  size={16}
                  className="text-icon-inverse"
                  strokeWidth={2.5}
                />
              </span>
              {completed ? (
                <Body
                  size="small"
                  bold
                  className="text-text-subtle whitespace-nowrap"
                >
                  {step}
                </Body>
              ) : (
                <div className="bg-btn-disabled-fill h-2 min-w-px flex-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
