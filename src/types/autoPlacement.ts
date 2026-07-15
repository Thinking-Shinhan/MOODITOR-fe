export type AutoPlacementMode = 'REGENERATE_ALL' | 'REGENERATE_TEMPLATE';

export type AutoPlacementTemplateType = 'IMAGE' | 'TEXT' | 'MIXED';

export type AutoPlacementTextRole =
  'EYEBROW' | 'HEADLINE' | 'SUBHEADLINE' | 'BODY' | 'CAPTION';

export interface AutoPlacementImageSlot {
  slotKey: string;
  slotOrder: number;
  assetId?: number | null;
}

export interface AutoPlacementTextSlot {
  slotKey: string;
  slotOrder: number;
  textRole: AutoPlacementTextRole;
  recommendedMaxLength: number;
  currentContent?: string | null;
}

export interface AutoPlacementTemplateBlock {
  blockOrder: number;
  instanceKey: string;
  templateKey: string;
  templateType: AutoPlacementTemplateType;
  imageSlots: AutoPlacementImageSlot[];
  textSlots: AutoPlacementTextSlot[];
}

export interface AutoPlacementRequest {
  productId: number;
  mode: AutoPlacementMode;
  targetInstanceKey?: string;
  templateBlocks: AutoPlacementTemplateBlock[];
}

export interface AutoPlacementImageResult {
  instanceKey: string;
  slotKey: string;
  assetId: number;
  fileUrl: string;
  assetRole: string;
}

export interface AutoPlacementCopyResult {
  instanceKey: string;
  slotKey: string;
  content: string;
}

export type AutoPlacementStatus = 'SUCCESS' | 'PARTIAL_SUCCESS';

export interface AutoPlacementError {
  stage: string;
  code: string;
  retryable: boolean;
}

export interface AutoPlacementResponse {
  productId: number;
  placements: AutoPlacementImageResult[];
  copies: AutoPlacementCopyResult[];
  status: AutoPlacementStatus;
  errors: AutoPlacementError[];
}
