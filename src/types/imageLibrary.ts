export interface ImageFolder {
  productId: number;
  productCode: string;
  productName: string;
  category: string;
  assetCount: number;
  thumbnailAssetId: number;
  thumbnailUrl: string;
}

export interface ImageFolderListResponse {
  imageFolders: ImageFolder[];
}

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
