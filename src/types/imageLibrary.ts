import type { ProductGender } from '@/types/product';

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

export interface AssetLikeResponse {
  assetId: number;
  liked: boolean;
}

export interface DeleteLibraryAssetResponse {
  assetId: number;
  message: string;
}

export interface DeleteDetailPageResponse {
  productId: number;
  message: string;
}

export interface LibraryImageAsset {
  assetId: number;
  type: string;
  imageUrl: string;
  description: string;
  status: string;
  isLiked: boolean;
  createdAt: string;
}

export interface ImageFolderDetailPage {
  detailPageId: number;
  status: string;
  fileUrl: string;
  fileName: string;
  createdAt: string;
}

export interface ImageFolderAssetsResponse {
  productId: number;
  productCode: string;
  productName: string;
  category: string;
  color: string;
  gender: ProductGender;
  hasDetailPage: boolean;
  detailPage: ImageFolderDetailPage | null;
  modelCutAssets: LibraryImageAsset[];
  productCutAssets: LibraryImageAsset[];
}
