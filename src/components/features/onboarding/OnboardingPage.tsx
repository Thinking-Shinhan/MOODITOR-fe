'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/commons/Button';
import { Heading, Body } from '@/components/commons/Typography';
import { ServiceHeader } from '@/components/commons/ServiceHeader';
import { StepProgressBar } from '@/components/commons/StepProgressBar';

const ONBOARDING_STEPS = ['웹사이트 링크', '브랜드 자료', '무드 분석'];

export default function OnboardingPage() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const isUrlFilled = websiteUrl.trim().length > 0;

  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <ServiceHeader />
      <div className="flex flex-1 flex-col items-center justify-center gap-[var(--gap-10)] py-[var(--padding-9)]">
        <div className="flex w-full flex-col items-center gap-[var(--gap-7)]">
          <div className="w-[192px]">
            <StepProgressBar steps={ONBOARDING_STEPS} currentStep={1} />
          </div>
          <div className="flex flex-col items-center gap-[var(--gap-2)] text-center">
            <Heading size="medium" className="text-text-basic">
              브랜드 웹사이트 링크를 입력해 주세요.
            </Heading>
            <Body size="medium" className="text-text-subtler">
              브랜드의 웹사이트를 분석해 이미지와 상세페이지에 반영할 톤앤매너를
              파악해요.
            </Body>
          </div>
        </div>

        <div className="border-btn-outline-border flex w-[660px] flex-col gap-[var(--size-height-3)] rounded-[var(--radius-large1)] border-[0.8px] p-[var(--padding-7)]">
          <textarea
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
            placeholder="https:// 브랜드 웹사이트 링크를 입력하세요"
            className="text-text-basic placeholder:text-text-subtler h-[72px] w-full resize-none text-[16px] leading-[1.5] focus:outline-none"
          />
          <div className="flex w-full items-center justify-end">
            <button
              type="button"
              disabled={!isUrlFilled}
              className={`flex size-8 items-center justify-center rounded-[var(--radius-small1)] transition-colors ${
                isUrlFilled
                  ? 'bg-btn-primary-fill-black cursor-pointer'
                  : 'bg-btn-disabled-fill cursor-not-allowed'
              }`}
            >
              <Check
                size={16}
                className={
                  isUrlFilled ? 'text-icon-inverse' : 'text-icon-disabled'
                }
              />
            </button>
          </div>
        </div>

        <div className="flex w-[660px] items-start gap-[var(--gap-5)]">
          <Button variant="tertiary" size="large" className="flex-1">
            이전
          </Button>
          <Button variant="primary" size="large" className="flex-1">
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
