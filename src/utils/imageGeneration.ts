import type { ImageGenerationProgressItem } from '@/types/imageGenerationJob';
import type { ProgressChecklistItem } from '@/components/commons/ProgressStepCard';

// outputIndex와 무관하게 완료 개수만큼 앞에서부터 활성화
export const buildProgressChecklistItems = (
  progressItems: ImageGenerationProgressItem[],
): ProgressChecklistItem[] => {
  const completedCount = progressItems.filter(
    (item) => item.status === 'COMPLETED',
  ).length;

  return progressItems.map((_, index) => ({
    label: `이미지 ${index + 1}장 생성 완료`,
    active: index < completedCount,
  }));
};
