'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/commons/Button';
import { Toast } from '@/components/commons/Toast';
import { ApiError } from '@/libs/apiClient';
import { OnboardingStepLayout } from '@/components/features/onboarding/OnboardingStepLayout';
import { WebsiteLinkInput } from '@/components/features/onboarding/WebsiteLinkInput';
import { BrandFileDropzone } from '@/components/features/onboarding/BrandFileDropzone';
import { AdditionalRequestInput } from '@/components/features/onboarding/AdditionalRequestInput';
import { BrandMoodAnalysisResult } from '@/components/features/onboarding/BrandMoodAnalysisResult';
import { ProgressStepModal } from '@/components/commons/ProgressStepModal';
import { useAnalyzeBrandMood } from '@/hooks/useAnalyzeBrandMood';
import { useSaveBrandMood } from '@/hooks/useSaveBrandMood';
import { useFakeProgress } from '@/hooks/useFakeProgress';
import type { BrandMoodAnalysis } from '@/types/onboarding';

// 100%로 바뀐 걸 잠깐 보여준 뒤 결과 화면으로 전환하기 위한 대기 시간
const RESULT_TRANSITION_DELAY_MS = 1000;

interface ProgressChecklistDefinition {
  label: string;
  // 이 진행률(%) 이상이면 활성화 상태로 표시
  threshold: number;
}

const MOOD_ANALYSIS_CHECKLIST: ProgressChecklistDefinition[] = [
  { label: '브랜드 웹사이트 분석 중', threshold: 1 },
  { label: '브랜드 자료 분석 중', threshold: 40 },
  { label: '무드 분석 완료', threshold: 100 },
];

const ResultHeaderIcon = () => (
  <div className="outline-btn-secondary-fill-hovered bg-icon-primary-basic flex size-[28px] shrink-0 items-center justify-center rounded-[var(--radius-max)] outline-[5px]">
    <Check size={18} className="text-icon-inverse" strokeWidth={3} />
  </div>
);

const AdditionalRequestTitle = () => (
  <span className="flex items-center gap-[var(--gap-2)]">
    브랜드에 대해서 더 알려주세요.
    <span className="bg-btn-tertiary-fill text-text-basic rounded-[var(--radius-max)] px-[var(--padding-5)] py-[var(--padding-2)] text-[14px] leading-[1.5] font-normal">
      선택
    </span>
  </span>
);

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [brandFile, setBrandFile] = useState<File | null>(null);
  const [additionalRequest, setAdditionalRequest] = useState('');
  const [analysis, setAnalysis] = useState<BrandMoodAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeBrandMood = useAnalyzeBrandMood();
  const saveBrandMood = useSaveBrandMood();
  const {
    progress: fakeProgress,
    reset: resetFakeProgress,
    complete: completeFakeProgress,
  } = useFakeProgress(isAnalyzing);

  const goToPreviousStep = () =>
    setCurrentStep((step) => Math.max(step - 1, 1));

  const handleAnalyze = () => {
    setErrorMessage(null);
    resetFakeProgress();
    setIsAnalyzing(true);
    analyzeBrandMood.mutate(
      {
        sourceUrl: websiteUrl,
        sourceType: 'URL',
        sourceText: additionalRequest.trim() || undefined,
        file: brandFile ?? undefined,
      },
      {
        onSuccess: (data) => {
          // 진행률을 100%로 채운 모습을 잠깐 보여준 뒤 결과 화면으로 넘어간다
          completeFakeProgress();
          setTimeout(() => {
            setAnalysis(data);
            setIsAnalyzing(false);
          }, RESULT_TRANSITION_DELAY_MS);
        },
        onError: (error) => {
          setIsAnalyzing(false);
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
        name: analysis.brandName,
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

  if (analysis) {
    return (
      <>
        <OnboardingStepLayout
          headerIcon={<ResultHeaderIcon />}
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
          <BrandMoodAnalysisResult analysis={analysis} />
        </OnboardingStepLayout>
        {errorToast}
      </>
    );
  }

  if (currentStep === 3) {
    return (
      <>
        <OnboardingStepLayout
          currentStep={3}
          title={<AdditionalRequestTitle />}
          subtitle="브랜드의 분위기나 원하는 방향을 알려주시면, AI가 분석 결과와 생성 결과에 반영해 드려요."
          onPrevious={goToPreviousStep}
          onNext={handleAnalyze}
          nextDisabled={isAnalyzing}
        >
          <AdditionalRequestInput
            value={additionalRequest}
            onChange={setAdditionalRequest}
          />
        </OnboardingStepLayout>
        <ProgressStepModal
          open={isAnalyzing}
          progress={fakeProgress}
          title="브랜드 무드 분석 중"
          completeTitle="브랜드 무드 분석 완료!"
          description={
            '웹사이트와 브랜드 자료를 바탕으로\n결과를 분석하고 있어요.'
          }
          items={MOOD_ANALYSIS_CHECKLIST.map((item) => ({
            label: item.label,
            active: fakeProgress >= item.threshold,
          }))}
        />
        {errorToast}
      </>
    );
  }

  if (currentStep === 2) {
    return (
      <OnboardingStepLayout
        currentStep={2}
        title="브랜드 자료 업로드를 업로드해 주세요."
        subtitle="브랜드 가이드, 소개서 등 브랜드의 분위기를 파악할 수 있는 자료를 업로드해 주세요."
        onPrevious={goToPreviousStep}
        onNext={() => setCurrentStep(3)}
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
      onPrevious={() => router.back()}
      onNext={() => setCurrentStep(2)}
      nextDisabled={websiteUrl.trim().length === 0}
    >
      <WebsiteLinkInput value={websiteUrl} onChange={setWebsiteUrl} />
    </OnboardingStepLayout>
  );
}
