'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/assetService';
import type { UploadProductImagesItem } from '@/services/assetService';
import type { ProductListResponse } from '@/types/product';

export const useUploadProductImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      items,
    }: {
      productId: number;
      items: UploadProductImagesItem[];
    }) => assetService.uploadProductImages(productId, items),
    onSuccess: (uploadedAssets, { productId }) => {
      const frontAsset = uploadedAssets.find(
        (asset) => asset.assetRole === 'PRODUCT_FRONT',
      );
      const backAsset = uploadedAssets.find(
        (asset) => asset.assetRole === 'PRODUCT_BACK',
      );

      queryClient.setQueriesData<ProductListResponse>(
        { queryKey: ['products'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            products: {
              ...old.products,
              content: old.products.content.map((product) =>
                product.id === productId
                  ? {
                      ...product,
                      productImages: {
                        front: frontAsset
                          ? {
                              assetId: frontAsset.assetId,
                              imageUrl: frontAsset.imageUrl,
                            }
                          : product.productImages.front,
                        back: backAsset
                          ? {
                              assetId: backAsset.assetId,
                              imageUrl: backAsset.imageUrl,
                            }
                          : product.productImages.back,
                      },
                    }
                  : product,
              ),
            },
          };
        },
      );
    },
  });
};
