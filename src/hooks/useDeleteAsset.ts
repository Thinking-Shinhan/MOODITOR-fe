'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/assetService';
import type { ProductListResponse } from '@/types/product';

interface DeleteAssetVariables {
  assetId: number;
  productId: number;
  role: 'front' | 'back';
}

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assetId }: DeleteAssetVariables) =>
      assetService.deleteAsset(assetId),
    onSuccess: (_data, { productId, role }) => {
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
                      productImages: { ...product.productImages, [role]: null },
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
