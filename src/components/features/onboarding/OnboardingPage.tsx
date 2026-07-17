'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/commons/Button';
import { Toast } from '@/components/commons/Toast';
import { ApiError } from '@/libs/apiClient';
import { OnboardingStepLayout } from '@/components/features/onboarding/OnboardingStepLayout';
import { WebsiteLinkInput } from '@/components/features/onboarding/WebsiteLinkInput';
import { BrandFileDropzone } from '@/components/features/onboarding/BrandFileDropzone';
import { BrandMoodAnalysisResult } from '@/components/features/onboarding/BrandMoodAnalysisResult';
import { useAnalyzeBrandMood } from '@/hooks/useAnalyzeBrandMood';
import { useSaveBrandMood } from '@/hooks/useSaveBrandMood';
import type { BrandMoodAnalysis } from '@/types/onboarding';

// TODO: 회원가입 응답의 브랜드명으로 교체 예정
const MOCK_BRAND_NAME = '에이븐';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [brandFile, setBrandFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<BrandMoodAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const analyzeBrandMood = useAnalyzeBrandMood();
  const saveBrandMood = useSaveBrandMood();

  const goToPreviousStep = () =>
    setCurrentStep((step) => Math.max(step - 1, 1));

  const handleAnalyze = () => {
    setErrorMessage(null);
    analyzeBrandMood.mutate(
      {
        sourceUrl: websiteUrl,
        sourceType: 'URL',
        file: brandFile ?? undefined,
      },
      {
        onSuccess: (data) => {
          setAnalysis(data);
          setCurrentStep(3);
        },
        onError: (error) => {
          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : '브랜드 무드 분석에 실패했어요. 다시 시도해주세요.',
          );
        },
      },
    );
  };

  const handleSave = () => {
    if (!analysis) return;

    setErrorMessage(null);
    saveBrandMood.mutate(
      {
        name: MOCK_BRAND_NAME,
        sourceType: analysis.sourceType,
        sourceUrl: analysis.sourceUrl,
        brandSummary: analysis.brandSummary,
        designPhilosophy: analysis.designPhilosophy,
        brandTone: analysis.brandTone,
        colorTemperature: analysis.colorTemperature,
        saturation: analysis.saturation,
        contrast: analysis.contrast,
        lighting: analysis.lighting,
        surfaceTexture: analysis.surfaceTexture,
        backgroundMood: analysis.backgroundMood,
        composition: analysis.composition,
        primaryColors: analysis.primaryColors,
        avoidElements: analysis.avoidElements,
        customBrandNote: analysis.customBrandNote,
        brandInstruction: '',
        rawAnalysisJson: analysis.rawAnalysisJson || '{}',
      },
      {
        onSuccess: () => router.push('/'),
        onError: (error) => {
          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : '브랜드 무드 저장에 실패했어요. 다시 시도해주세요.',
          );
        },
      },
    );
  };

  const errorToast = (
    <Toast
      open={errorMessage !== null}
      state="error"
      message={errorMessage ?? ''}
      onClose={() => setErrorMessage(null)}
    />
  );

  if (currentStep === 3 && analysis) {
    return (
      <>
        <OnboardingStepLayout
          currentStep={3}
          title="브랜드 무드 분석 결과를 알려드려요."
          subtitle="분석된 브랜드 무드를 이미지와 상세페이지 제작에 반영해 우리 브랜드에 꼭 맞는 결과물을 만들 수 있어요."
          footer={
            <div className="flex w-[1356px] items-start gap-[var(--gap-5)]">
              <Button
                variant="primary"
                size="large"
                className="flex-1"
                onClick={handleSave}
                disabled={saveBrandMood.isPending}
              >
                {saveBrandMood.isPending ? '저장 중...' : '시작하기'}
              </Button>
            </div>
          }
        >
          <BrandMoodAnalysisResult
            brandName={MOCK_BRAND_NAME}
            analysis={analysis}
          />
        </OnboardingStepLayout>
        {errorToast}
      </>
    );
  }

  if (currentStep === 2) {
    return (
      <>
        <OnboardingStepLayout
          currentStep={2}
          title="브랜드 자료 업로드를 업로드해 주세요."
          subtitle="브랜드 가이드, 소개서 등 브랜드의 분위기를 파악할 수 있는 자료를 업로드해 주세요."
          onPrevious={goToPreviousStep}
          onNext={handleAnalyze}
          nextDisabled={analyzeBrandMood.isPending}
          nextLabel={analyzeBrandMood.isPending ? '분석 중...' : '다음'}
        >
          <BrandFileDropzone
            file={brandFile}
            onSelect={setBrandFile}
            onRemove={() => setBrandFile(null)}
          />
        </OnboardingStepLayout>
        {errorToast}
      </>
    );
  }

  return (
    <OnboardingStepLayout
      currentStep={1}
      title="브랜드 웹사이트 링크를 입력해 주세요."
      subtitle="브랜드의 웹사이트를 분석해 이미지와 상세페이지에 반영할 톤앤매너를 파악해요."
      onNext={() => setCurrentStep(2)}
      nextDisabled={websiteUrl.trim().length === 0}
    >
      <WebsiteLinkInput value={websiteUrl} onChange={setWebsiteUrl} />
    </OnboardingStepLayout>
  );
}
