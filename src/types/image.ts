export type ImageAspectRatio = '1:1' | '2:3' | '3:4' | '4:5' | '16:9' | '9:16';

export type ReferenceAssetType = 'MODEL' | 'POSE' | 'BACKGROUND';

export interface ReferenceAsset {
  referenceAssetId: number;
  key: string;
  assetType: ReferenceAssetType;
  label: string;
  description: string;
  imageUrl: string;
}

export interface ReferenceAssetsResponse {
  assetType: ReferenceAssetType | null;
  referenceAssets: ReferenceAsset[];
}
