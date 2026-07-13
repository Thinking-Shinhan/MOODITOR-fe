export type ImageAspectRatio = '1:1' | '2:3' | '3:4' | '4:5' | '16:9' | '9:16';

export type ReferenceAssetType =
  'MODEL' | 'POSE' | 'BACKGROUND' | 'SHOT_TEMPLATE' | 'SHOT_REFERENCE';

export interface ReferenceAsset {
  referenceAssetId: number;
  key: string;
  assetType: ReferenceAssetType;
  label: string;
  description: string;
  imageUrl: string;
  cutType?: string;
  promptText?: string;
}

export interface ReferenceAssetsResponse {
  assetType: ReferenceAssetType | null;
  referenceAssets: ReferenceAsset[];
}
