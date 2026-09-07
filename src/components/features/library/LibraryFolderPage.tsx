'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { AlertModal } from '@/components/commons/AlertModal';
import { Toast } from '@/components/commons/Toast';
import { Heading, Body } from '@/components/commons/Typography';
import { Spinner } from '@/components/commons/Spinner';
import { LibraryFolderHeader } from '@/components/features/library/LibraryFolderHeader';
import {
  LibraryImageCard,
  type LibraryImageCardType,
} from '@/components/features/library/LibraryImageCard';
import { ImagePreviewModal } from '@/components/commons/ImagePreviewModal';
import { useImageFolderAssets } from '@/hooks/useImageFolderAssets';
import { useDeleteLibraryAsset } from '@/hooks/useDeleteLibraryAsset';
import { useDeleteDetailPage } from '@/hooks/useDeleteDetailPage';
import { useToggleAssetLike } from '@/hooks/useToggleAssetLike';
import { useDetailPagePreviewStore } from '@/stores/detailPagePreviewStore';
import { useDetailProductSelectionStore } from '@/stores/detailProductSelectionStore';
import { getFileNameFromUrl } from '@/utils/url';
import type {
  ImageFolderAssetsResponse,
  LibraryImageAsset,
} from '@/types/imageLibrary';

interface MutationContext {
  previous: ImageFolderAssetsResponse | undefined;
}

export const LibraryFolderPage = () => {
  const params = useParams<{ productId: string }>();
  const productId = Number(params.productId);
  const router = useRouter();
  const queryClient = useQueryClient();
  const setDetailPagePreviewImageUrl = useDetailPagePreviewStore(
    (state) => state.setImageUrl,
  );
  const setSelectedDetailProduct = useDetailProductSelectionStore(
    (state) => state.setSelectedProduct,
  );

  const { data, isLoading, isError } = useImageFolderAssets(productId);
  const [assetIdToDelete, setAssetIdToDelete] = useState<number | null>(null);
  const [isDetailPageDeleteConfirmOpen, setIsDetailPageDeleteConfirmOpen] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    fileName: string;
  } | null>(null);

  const assetsQueryKey = ['imageFolderAssets', productId];

  const snapshotAssets = async (): Promise<MutationContext> => {
    await queryClient.cancelQueries({ queryKey: assetsQueryKey });
    return {
      previous:
        queryClient.getQueryData<ImageFolderAssetsResponse>(assetsQueryKey),
    };
  };

  const rollback = (context: MutationContext | undefined) => {
    if (context?.previous) {
      queryClient.setQueryData(assetsQueryKey, context.previous);
    }
    setErrorMessage('요청을 처리하지 못했어요. 다시 시도해주세요.');
  };

  const invalidateAssets = () => {
    queryClient.invalidateQueries({ queryKey: assetsQueryKey });
  };

  const deleteAsset = useDeleteLibraryAsset<MutationContext>({
    onMutate: async (assetId) => {
      const context = await snapshotAssets();
      if (context.previous) {
        queryClient.setQueryData<ImageFolderAssetsResponse>(assetsQueryKey, {
          ...context.previous,
          modelCutAssets: context.previous.modelCutAssets.filter(
            (asset) => asset.assetId !== assetId,
          ),
          productCutAssets: context.previous.productCutAssets.filter(
            (asset) => asset.assetId !== assetId,
          ),
        });
      }
      return context;
    },
    onError: (_error, _assetId, context) => rollback(context),
    onSettled: invalidateAssets,
  });

  const deleteDetailPage = useDeleteDetailPage<MutationContext>({
    onMutate: async () => {
      const context = await snapshotAssets();
      if (context.previous) {
        queryClient.setQueryData<ImageFolderAssetsResponse>(assetsQueryKey, {
          ...context.previous,
          hasDetailPage: false,
          detailPage: null,
        });
      }
      return context;
    },
    onError: (_error, _productId, context) => rollback(context),
    onSettled: invalidateAssets,
  });

  const toggleLike = useToggleAssetLike<MutationContext>({
    onMutate: async (assetId) => {
      const context = await snapshotAssets();
      if (context.previous) {
        const flip = (assets: LibraryImageAsset[]) =>
          assets.map((asset) =>
            asset.assetId === assetId
              ? { ...asset, isLiked: !asset.isLiked }
              : asset,
          );
        queryClient.setQueryData<ImageFolderAssetsResponse>(assetsQueryKey, {
          ...context.previous,
          modelCutAssets: flip(context.previous.modelCutAssets),
          productCutAssets: flip(context.previous.productCutAssets),
        });
      }
      return context;
    },
    onError: (_error, _assetId, context) => rollback(context),
    onSettled: invalidateAssets,
  });

  const handleConfirmDelete = () => {
    if (assetIdToDelete === null) return;
    deleteAsset.mutate(assetIdToDelete);
    setAssetIdToDelete(null);
  };

  const handleConfirmDeleteDetailPage = () => {
    deleteDetailPage.mutate(productId);
    setIsDetailPageDeleteConfirmOpen(false);
  };

  const handleToggleLike = (assetId: number) => {
    toggleLike.mutate(assetId);
  };

  const handleViewDetailPage = () => {
    if (!data?.hasDetailPage || !data.detailPage) return;
    setDetailPagePreviewImageUrl(data.detailPage.fileUrl, 'library');
    setSelectedDetailProduct({
      id: String(data.productId),
      name: data.productName,
      assetIds: [],
    });
    router.push('/detail-edit/preview');
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
                likePending={
                  toggleLike.isPending && toggleLike.variables === asset.assetId
                }
                onDelete={() => setAssetIdToDelete(asset.assetId)}
                onClick={() =>
                  setPreviewImage({
                    url: asset.imageUrl,
                    fileName: getFileNameFromUrl(asset.imageUrl),
                  })
                }
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
              onDelete={() => setIsDetailPageDeleteConfirmOpen(true)}
              onClick={handleViewDetailPage}
            />
          </div>
        </div>
      )}

      <ImagePreviewModal
        open={previewImage !== null}
        imageUrl={previewImage?.url ?? ''}
        fileName={previewImage?.fileName ?? ''}
        onClose={() => setPreviewImage(null)}
      />

      <AlertModal
        open={assetIdToDelete !== null}
        title="해당 이미지를 삭제하시겠어요?"
        description={
          '저장된 해당 이미지가 삭제되며,\n삭제된 내용은 복구할 수 없습니다.'
        }
        cancelText="취소"
        onCancel={() => setAssetIdToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <AlertModal
        open={isDetailPageDeleteConfirmOpen}
        title="해당 상세페이지를 삭제하시겠어요?"
        description={
          '저장된 상세페이지가 삭제되며,\n삭제된 내용은 복구할 수 없습니다.'
        }
        cancelText="취소"
        onCancel={() => setIsDetailPageDeleteConfirmOpen(false)}
        onConfirm={handleConfirmDeleteDetailPage}
      />

      <Toast
        open={errorMessage !== null}
        state="error"
        message={errorMessage ?? ''}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};
