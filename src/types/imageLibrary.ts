export interface LibraryImageAsset {
  assetId: number;
  type: string;
  assetRole: string;
  imageUrl: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface ImageFolderAssetsResponse {
  productId: number;
  productCode: string;
  productName: string;
  category: string;
  assets: LibraryImageAsset[];
}
