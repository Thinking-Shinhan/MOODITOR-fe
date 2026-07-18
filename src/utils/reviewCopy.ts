import { buildTemplateBlocks } from '@/utils/auto-placement';
import type { PlacedImage } from '@/stores/imagePlacementStore';
import type { PlacedTemplate } from '@/stores/detailCanvasStore';
import type {
  CopyReviewItem,
  ReviewCopyIssue,
  ReviewCopyRequest,
} from '@/types/reviewCopy';
import {
  REVIEW_COPY_ISSUE_CATEGORY_LABEL,
  REVIEW_COPY_TEXT_ROLE_LABEL,
} from '@/constants/reviewCopy';

// suggestion이 null일 때 카드에 보여주는 안내 문구. 실제 캔버스에 적용하면 안 되는 값이라
// 적용 로직(copyReviewStore)에서 이 값과 비교해 걸러낸다
export const NO_SUGGESTION_TEXT = '제안 문구가 없어요.';

interface BuildReviewCopyRequestParams {
  productId: number;
  placedTemplates: PlacedTemplate[];
  images: Record<string, PlacedImage>;
  texts: Record<string, string>;
}

export const buildReviewCopyRequest = ({
  productId,
  placedTemplates,
  images,
  texts,
}: BuildReviewCopyRequestParams): ReviewCopyRequest => ({
  productId,
  templateBlocks: buildTemplateBlocks(placedTemplates, images, texts),
});

// 이슈는 instanceKey에 해당하는 블록의 캔버스 상 순서(blockOrder)를 모르므로,
// 요청 시점의 placedTemplates 순서를 그대로 페이지 번호로 매핑해 표시한다
export const mapReviewCopyIssuesToItems = (
  issues: ReviewCopyIssue[],
  placedTemplates: PlacedTemplate[],
): CopyReviewItem[] => {
  const pageNumberByInstanceKey = new Map(
    placedTemplates.map((template, index) => [template.id, index + 1]),
  );

  return issues.map((issue) => ({
    id: `${issue.instanceKey}-${issue.slotKey}`,
    instanceKey: issue.instanceKey,
    slotKey: issue.slotKey,
    pageNumber: pageNumberByInstanceKey.get(issue.instanceKey) ?? 0,
    subtitle: REVIEW_COPY_TEXT_ROLE_LABEL[issue.textRole],
    issueTag: REVIEW_COPY_ISSUE_CATEGORY_LABEL[issue.category],
    currentText: issue.targetCopy,
    suggestedText: issue.suggestion ?? NO_SUGGESTION_TEXT,
    reason: issue.issue,
    status: 'idle',
  }));
};
