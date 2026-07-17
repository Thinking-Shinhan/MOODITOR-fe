import { Fragment } from 'react';
import { Body } from '@/components/commons/Typography';

interface StepProgressBarProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const StepProgressBar = ({
  steps,
  currentStep,
  className = '',
}: StepProgressBarProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isReached = currentStep >= stepNumber;
        const isLineActive = currentStep > stepNumber;
        const isLast = index === steps.length - 1;

        return (
          <Fragment key={label}>
            <div
              className={`relative flex size-5 shrink-0 items-center justify-center rounded-[var(--radius-max)] ${
                isReached
                  ? 'bg-btn-primary-fill-black'
                  : 'bg-btn-tertiary-fill-pressed'
              }`}
            >
              <Body size="xsmall" bold className="text-text-border-inverse">
                {stepNumber}
              </Body>
              <Body
                size="xsmall"
                bold
                className={`absolute bottom-[calc(100%+var(--gap-3))] left-1/2 -translate-x-1/2 whitespace-nowrap ${
                  isReached ? 'text-text-basic' : 'text-text-disabled'
                }`}
              >
                {label}
              </Body>
            </div>

            {!isLast && (
              <div
                className={`h-[1.5px] flex-1 ${
                  isLineActive
                    ? 'bg-btn-primary-fill-black'
                    : 'bg-border-subtle'
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
