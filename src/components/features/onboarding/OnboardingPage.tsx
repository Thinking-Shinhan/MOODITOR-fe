'use client';

import { useState } from 'react';
import { Button } from '@/components/commons/Button';
import { OnboardingStepLayout } from '@/components/features/onboarding/OnboardingStepLayout';
import { WebsiteLinkInput } from '@/components/features/onboarding/WebsiteLinkInput';
import { BrandFileDropzone } from '@/components/features/onboarding/BrandFileDropzone';
import { BrandMoodAnalysisResult } from '@/components/features/onboarding/BrandMoodAnalysisResult';
import type { BrandMoodAnalysis } from '@/types/onboarding';

// TODO: 회원가입 응답의 브랜드명으로 교체 예정
const MOCK_BRAND_NAME = '에이븐';

// TODO: 무드 분석 API 연동 전까지 쓰는 예시 데이터
const MOCK_BRAND_MOOD_ANALYSIS: BrandMoodAnalysis = {
  sourceType: 'WEBSITE',
  sourceUrl: '',
  brandSummary:
    '알래스카 자연에서 영감을 받은 프리미엄 아웃도어 퍼포먼스웨어 브랜드',
  designPhilosophy: 'Engineered Elegance',
  brandTone: ['프리미엄', '차분함', '정제됨'],
  colorTemperature: '쿨톤',
  saturation: '낮음',
  contrast: '중간',
  lighting: '부드러운 조명',
  surfaceTexture: '매트함',
  backgroundMood: '자연 기반 에디토리얼',
  composition: '깔끔한 구도',
  primaryColors: [],
  avoidElements: ['네온', '저가 쇼핑몰 느낌', '아이돌 느낌'],
  customBrandNote: '차갑지만 병원 느낌은 피한다',
  rawAnalysisJson: '',
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [brandFile, setBrandFile] = useState<File | null>(null);

  const goToPreviousStep = () =>
    setCurrentStep((step) => Math.max(step - 1, 1));
  const goToNextStep = () => setCurrentStep((step) => Math.min(step + 1, 3));

  if (currentStep === 3) {
    return (
      <OnboardingStepLayout
        currentStep={3}
        title="브랜드 무드 분석 결과를 알려드려요."
        subtitle="분석된 브랜드 무드를 이미지와 상세페이지 제작에 반영해 우리 브랜드에 꼭 맞는 결과물을 만들 수 있어요."
        footer={
          <div className="flex w-[1356px] items-start gap-[var(--gap-5)]">
            <Button variant="primary" size="large" className="flex-1">
              시작하기
            </Button>
          </div>
        }
      >
        <BrandMoodAnalysisResult
          brandName={MOCK_BRAND_NAME}
          analysis={MOCK_BRAND_MOOD_ANALYSIS}
        />
      </OnboardingStepLayout>
    );
  }

  if (currentStep === 2) {
    return (
      <OnboardingStepLayout
        currentStep={2}
        title="브랜드 자료 업로드를 업로드해 주세요."
        subtitle="브랜드 가이드, 소개서 등 브랜드의 분위기를 파악할 수 있는 자료를 업로드해 주세요."
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
      >
        <BrandFileDropzone
          file={brandFile}
          onSelect={setBrandFile}
          onRemove={() => setBrandFile(null)}
        />
      </OnboardingStepLayout>
    );
  }

  return (
    <OnboardingStepLayout
      currentStep={1}
      title="브랜드 웹사이트 링크를 입력해 주세요."
      subtitle="브랜드의 웹사이트를 분석해 이미지와 상세페이지에 반영할 톤앤매너를 파악해요."
      onNext={goToNextStep}
    >
      <WebsiteLinkInput value={websiteUrl} onChange={setWebsiteUrl} />
    </OnboardingStepLayout>
  );
}
