import type {
  AutoPlacementTemplateBlock,
  AutoPlacementTextRole,
} from '@/types/autoPlacement';

export type ReviewCopyIssueCategory =
  'CLAIM_RISK' | 'CONTENT_MISMATCH' | 'PAGE_COHERENCE' | 'BRAND_FIT';

export interface ReviewCopyRequest {
  productId: number;
  templateBlocks: AutoPlacementTemplateBlock[];
}

export interface ReviewCopyIssue {
  category: ReviewCopyIssueCategory;
  instanceKey: string;
  slotKey: string;
  textRole: AutoPlacementTextRole;
  targetCopy: string;
  issue: string;
  suggestion: string | null;
}

export interface ReviewCopyResponse {
  productId: number;
  issues: ReviewCopyIssue[];
}

export type CopyReviewStatus = 'idle' | 'applying' | 'applied';

export interface CopyReviewItem {
  id: string;
  instanceKey: string;
  slotKey: string;
  pageNumber: number;
  subtitle: string;
  issueTag: string;
  currentText: string;
  suggestedText: string;
  reason: string;
  status: CopyReviewStatus;
}
