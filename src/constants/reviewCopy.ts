import type { AutoPlacementTextRole } from '@/types/autoPlacement';
import type { ReviewCopyIssueCategory } from '@/types/reviewCopy';

export const REVIEW_COPY_ISSUE_CATEGORY_LABEL: Record<
  ReviewCopyIssueCategory,
  string
> = {
  CLAIM_RISK: '과장 표현 주의',
  CONTENT_MISMATCH: '내용 불일치',
  PAGE_COHERENCE: '흐름 어색함',
  BRAND_FIT: '브랜드 톤 불일치',
};

export const REVIEW_COPY_TEXT_ROLE_LABEL: Record<
  AutoPlacementTextRole,
  string
> = {
  EYEBROW: '아이브로우',
  HEADLINE: '헤드라인',
  SUBHEADLINE: '서브헤드라인',
  BODY: '본문',
  CAPTION: '캡션',
};
