import { ReactNode } from 'react';
import { Button } from '@/components/commons/Button';
import { ServiceHeader } from '@/components/commons/ServiceHeader';
import { StepProgressBar } from '@/components/commons/StepProgressBar';
import { Heading, Body } from '@/components/commons/Typography';

const ONBOARDING_STEPS = ['웹사이트 링크', '브랜드 자료', '무드 분석'];

interface OnboardingStepLayoutProps {
  currentStep: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  footer?: ReactNode;
}

export const OnboardingStepLayout = ({
  currentStep,
  title,
  subtitle,
  children,
  onPrevious,
  onNext,
  nextDisabled = false,
  nextLabel = '다음',
  footer,
}: OnboardingStepLayoutProps) => (
  <div className="flex h-full min-h-screen w-full flex-col">
    <ServiceHeader />
    <div className="flex flex-1 flex-col items-center justify-center gap-[var(--gap-10)] py-[var(--padding-9)]">
      <div className="flex w-full flex-col items-center gap-[var(--gap-7)]">
        <div className="w-[192px]">
          <StepProgressBar steps={ONBOARDING_STEPS} currentStep={currentStep} />
        </div>
        <div className="flex flex-col items-center gap-[var(--gap-2)] text-center">
          <Heading size="medium" className="text-text-basic">
            {title}
          </Heading>
          <Body size="medium" className="text-text-subtler">
            {subtitle}
          </Body>
        </div>
      </div>

      {children}

      {footer ?? (
        <div className="flex w-[660px] items-start gap-[var(--gap-5)]">
          <Button
            variant="tertiary"
            size="large"
            className="flex-1"
            onClick={onPrevious}
          >
            이전
          </Button>
          <Button
            variant="primary"
            size="large"
            className="flex-1"
            onClick={onNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </Button>
        </div>
      )}
    </div>
  </div>
);
