'use client';

import { useState } from 'react';
import { OnboardingStepLayout } from '@/components/features/onboarding/OnboardingStepLayout';
import { WebsiteLinkInput } from '@/components/features/onboarding/WebsiteLinkInput';
import { BrandFileDropzone } from '@/components/features/onboarding/BrandFileDropzone';

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [brandFile, setBrandFile] = useState<File | null>(null);

  const goToPreviousStep = () =>
    setCurrentStep((step) => Math.max(step - 1, 1));
  const goToNextStep = () => setCurrentStep((step) => Math.min(step + 1, 3));

  if (currentStep === 2) {
    return (
      <OnboardingStepLayout
        currentStep={2}
        title="브랜드 자료 업로드를 업로드해 주세요."
        subtitle="브랜드 가이드, 소개서 등 브랜드의 분위기를 파악할 수 있는 자료를 업로드해 주세요."
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
      >
        <BrandFileDropzone file={brandFile} onSelect={setBrandFile} />
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
