'use client';

import { useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Heading, Body } from '@/components/commons/Typography';
import { Spinner } from '@/components/commons/Spinner';
import { LibraryFolderHeader } from '@/components/features/library/LibraryFolderHeader';
import {
  LibraryImageCard,
  type LibraryImageCardType,
} from '@/components/features/library/LibraryImageCard';
import { useImageFolderAssets } from '@/hooks/useImageFolderAssets';
import { useDeleteAsset } from '@/hooks/useDeleteAsset';
import { useToggleAssetLike } from '@/hooks/useToggleAssetLike';
import type { LibraryImageAsset } from '@/types/imageLibrary';

const getFileNameFromUrl = (url: string) => {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split('/').pop() || url;
  } catch {
    return url;
  }
};

export const LibraryFolderPage = () => {
  const params = useParams<{ productId: string }>();
  const productId = Number(params.productId);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useImageFolderAssets(productId);
  const deleteAsset = useDeleteAsset();
  const toggleLike = useToggleAssetLike();

  const invalidateAssets = () => {
    queryClient.invalidateQueries({
      queryKey: ['imageFolderAssets', productId],
    });
  };

  const handleDelete = (assetId: number) => {
    deleteAsset.mutate(assetId, { onSuccess: invalidateAssets });
  };

  const handleToggleLike = (assetId: number) => {
    toggleLike.mutate(assetId, { onSuccess: invalidateAssets });
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center p-[var(--padding-9)]">
        <Spinner size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex w-full flex-col items-start p-[var(--padding-9)]">
        <Body size="xsmall" className="text-icon-danger">
          이미지 폴더를 불러오지 못했습니다.
        </Body>
      </div>
    );
  }

  const imageAssets: (LibraryImageAsset & {
    cardType: LibraryImageCardType;
  })[] = [
    ...data.modelCutAssets.map((asset) => ({
      ...asset,
      cardType: 'MODEL_CUT' as const,
    })),
    ...data.productCutAssets.map((asset) => ({
      ...asset,
      cardType: 'PRODUCT_CUT' as const,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="flex w-full flex-col items-start gap-[var(--gap-8)] py-[32px] pl-[32px]">
      <LibraryFolderHeader
        productName={data.productName}
        productCode={data.productCode}
        category={data.category}
        color={data.color}
        gender={data.gender}
      />

      <div className="flex w-full flex-col items-start gap-[var(--gap-5)]">
        <div className="flex items-center gap-[var(--gap-1)]">
          <Heading size="xsmall" className="text-text-basic">
            이미지
          </Heading>
          <ChevronRight size={20} className="text-icon-gray" />
        </div>
        {imageAssets.length === 0 ? (
          <Body size="medium" className="text-text-subtler">
            저장된 이미지가 없습니다.
          </Body>
        ) : (
          <div className="flex w-full items-start gap-[var(--gap-5)] overflow-x-auto">
            {imageAssets.map((asset) => (
              <LibraryImageCard
                key={asset.assetId}
                type={asset.cardType}
                imageUrl={asset.imageUrl}
                fileName={getFileNameFromUrl(asset.imageUrl)}
                createdAt={asset.createdAt}
                liked={asset.isLiked}
                onToggleLike={() => handleToggleLike(asset.assetId)}
                onDelete={() => handleDelete(asset.assetId)}
              />
            ))}
          </div>
        )}
      </div>

      {data.hasDetailPage && data.detailPage && (
        <div className="flex w-full flex-col items-start gap-[var(--gap-5)]">
          <div className="flex items-center gap-[var(--gap-1)]">
            <Heading size="xsmall" className="text-text-basic">
              상세페이지
            </Heading>
            <ChevronRight size={20} className="text-icon-gray" />
          </div>
          <div className="flex w-full items-start gap-[var(--gap-5)] overflow-x-auto">
            <LibraryImageCard
              type="DETAIL_PAGE"
              imageUrl={data.detailPage.fileUrl}
              fileName={data.detailPage.fileName}
              createdAt={data.detailPage.createdAt}
            />
          </div>
        </div>
      )}
    </div>
  );
};
