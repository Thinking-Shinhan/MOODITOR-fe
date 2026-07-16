export interface ImageFolderPreviewImage {
  assetId: number;
  imageUrl: string;
}

export interface ImageFolderCounts {
  modelCut: number;
  productCut: number;
  detailPage: number;
  total: number;
}

export interface ImageFolder {
  productId: number;
  productCode: string;
  productName: string;
  category: string;
  previewImages: ImageFolderPreviewImage[];
  counts: ImageFolderCounts;
  updatedAt: string;
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
