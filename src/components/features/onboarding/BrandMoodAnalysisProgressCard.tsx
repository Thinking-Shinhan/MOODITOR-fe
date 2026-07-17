import { Check } from 'lucide-react';
import { ProgressRing } from '@/components/commons/ProgressRing';
import { Heading, Body } from '@/components/commons/Typography';

interface BrandMoodAnalysisProgressCardProps {
  progress: number;
  className?: string;
}

interface ChecklistItem {
  label: string;
  // 이 진행률(%) 이상이면 활성화 상태로 표시
  threshold: number;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { label: '브랜드 웹사이트 분석 중', threshold: 1 },
  { label: '브랜드 자료 분석 중', threshold: 40 },
  { label: '무드 분석 완료', threshold: 100 },
];

export const BrandMoodAnalysisProgressCard = ({
  progress,
  className = '',
}: BrandMoodAnalysisProgressCardProps) => {
  const clamped = Math.min(100, Math.max(0, progress));
  const isComplete = clamped >= 100;

  return (
    <div
      className={`bg-bg-white flex w-[480px] flex-col items-center gap-[var(--gap-9)] rounded-[var(--radius-large2)] p-[var(--padding-10)] ${className}`}
    >
      <div className="flex w-full flex-col items-center gap-[var(--gap-7)]">
        <ProgressRing progress={clamped} />
        <div className="flex w-full flex-col items-center gap-[var(--gap-2)] text-center">
          <Heading size="medium" className="text-text-basic w-full">
            {isComplete ? '브랜드 무드 분석 완료!' : '브랜드 무드 분석 중'}
          </Heading>
          <Body
            size="medium"
            className="text-text-subtler w-full whitespace-pre-line"
          >
            {'웹사이트와 브랜드 자료를 바탕으로\n결과를 분석하고 있어요.'}
          </Body>
        </div>
      </div>
      <div className="flex w-[193px] flex-col items-start gap-[var(--gap-4)]">
        {CHECKLIST_ITEMS.map((item) => {
          const active = clamped >= item.threshold;

          return (
            <div
              key={item.label}
              className={[
                'flex w-full items-center gap-[var(--gap-3)] rounded-[var(--radius-max)] border-[0.5px] py-[var(--padding-3)] pr-[var(--padding-5)] pl-[var(--padding-4)]',
                'bg-bg-white drop-shadow-[0px_2px_4px_rgba(0,0,0,0.04)]',
                active
                  ? 'border-btn-secondary-border'
                  : 'border-btn-outline-border',
              ].join(' ')}
            >
              <span
                className={`flex size-7 h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  active ? 'bg-icon-primary-basic' : 'bg-icon-disabled'
                }`}
              >
                <Check
                  size={16}
                  className="text-icon-inverse"
                  strokeWidth={2.5}
                />
              </span>
              {active ? (
                <Body
                  size="small"
                  bold
                  className="text-text-subtle whitespace-nowrap"
                >
                  {item.label}
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
