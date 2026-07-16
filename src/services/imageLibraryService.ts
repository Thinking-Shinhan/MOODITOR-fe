import { apiClient } from '@/libs/apiClient';
import type {
  AssetLikeResponse,
  DeleteLibraryAssetResponse,
  ImageFolderAssetsResponse,
  ImageFolderListResponse,
} from '@/types/imageLibrary';

export const imageLibraryService = {
  getImageFolders: (category?: string) =>
    apiClient.get<ImageFolderListResponse>(
      `/library/image-folders${
        category ? `?category=${encodeURIComponent(category)}` : ''
      }`,
    ),

  getImageFolderAssets: (productId: number) =>
    apiClient.get<ImageFolderAssetsResponse>(
      `/library/image-folders/${productId}/assets`,
    ),

  toggleLike: (assetId: number) =>
    apiClient.post<AssetLikeResponse>(`/library/${assetId}/like`, undefined),

  deleteAsset: (assetId: number) =>
    apiClient.delete<DeleteLibraryAssetResponse>(`/library/assets/${assetId}`),
};
