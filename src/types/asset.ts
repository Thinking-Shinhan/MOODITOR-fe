export type AssetRole =
  | 'PRODUCT_FRONT'
  | 'PRODUCT_BACK'
  | 'COORDINATION_ITEM'
  | 'DETAIL'
  | 'PRODUCT_IMAGE'
  | 'GENERATED_RESULT';

export interface ProductImageAsset {
  assetId: number;
  assetRole: AssetRole;
  imageUrl: string;
  objectName: string;
  originalFilename: string;
  contentType: string;
  size: number;
}
