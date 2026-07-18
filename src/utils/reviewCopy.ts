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
