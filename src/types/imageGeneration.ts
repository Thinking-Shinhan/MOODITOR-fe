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
