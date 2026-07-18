import type { ImageGenerationProgressItem } from '@/types/imageGenerationJob';
import type { ProgressChecklistItem } from '@/components/commons/ProgressStepCard';

export const buildProgressChecklistItems = (
  progressItems: ImageGenerationProgressItem[],
  expectedCount: number,
): ProgressChecklistItem[] => {
  if (progressItems.length === 0) {
    return Array.from({ length: expectedCount }, (_, index) => ({
      label: `이미지 ${index + 1}장 생성 완료`,
      active: false,
    }));
  }

  const completedCount = progressItems.filter(
    (item) => item.status === 'COMPLETED',
  ).length;

  return progressItems.map((_, index) => ({
    label: `이미지 ${index + 1}장 생성 완료`,
    active: index < completedCount,
  }));
};
