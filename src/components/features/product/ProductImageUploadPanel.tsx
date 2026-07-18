'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading, Body } from '@/components/commons/Typography';
import { Button } from '@/components/commons/Button';
import { InputMessage } from '@/components/commons/InputMessage';
import { ImageUploadField } from '@/components/commons/ImageUploadField';
import { useProductSelectionStore } from '@/stores/productSelectionStore';
import { useUploadProductImages } from '@/hooks/useUploadProductImages';
import { useDeleteAsset } from '@/hooks/useDeleteAsset';
import { useObjectUrl } from '@/hooks/useObjectUrl';
import { ApiError } from '@/libs/apiClient';
import { assetService } from '@/services/assetService';
import type { Product } from '@/types/product';
import type { UploadProductImagesItem } from '@/services/assetService';

interface ProductImageUploadPanelProps {
  selectedProduct: Product;
}

export const ProductImageUploadPanel = ({
  selectedProduct,
}: ProductImageUploadPanelProps) => {
  const router = useRouter();
  const addProducts = useProductSelectionStore((state) => state.addProducts);
  const { mutateAsync: uploadProductImages, isPending } =
    useUploadProductImages();
  const { mutateAsync: deleteAsset } = useDeleteAsset();

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontRemoved, setFrontRemoved] = useState(false);
  const [backRemoved, setBackRemoved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const existingFrontAsset = selectedProduct.productImages.front;
  const existingBackAsset = selectedProduct.productImages.back;

  const frontObjectUrl = useObjectUrl(frontImage);
  const backObjectUrl = useObjectUrl(backImage);

  const frontPreviewUrl =
    frontObjectUrl ??
    (frontRemoved ? null : (existingFrontAsset?.imageUrl ?? null));
  const backPreviewUrl =
    backObjectUrl ??
    (backRemoved ? null : (existingBackAsset?.imageUrl ?? null));

  const isReady = frontPreviewUrl !== null && backPreviewUrl !== null;

  const handleUploadFront = (file: File) => {
    setFrontImage(file);
    setFrontRemoved(false);
  };

  const handleRemoveFront = async () => {
    // 직접 업로드해서 아직 저장 전인 로컬 파일이면 API 호출 없이 그대로 비움
    if (frontImage) {
      setFrontImage(null);
      return;
    }

    // 상품 이미지 조회로 불러온 기존 이미지면 삭제 API 호출 후 미리보기 제거
    if (existingFrontAsset) {
      setErrorMessage(null);
      try {
        await deleteAsset(existingFrontAsset.assetId);
        setFrontRemoved(true);
      } catch (error) {
        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : '이미지 삭제에 실패했습니다.',
        );
      }
    }
  };

  const handleUploadBack = (file: File) => {
    setBackImage(file);
    setBackRemoved(false);
  };

  const handleRemoveBack = async () => {
    if (backImage) {
      setBackImage(null);
      return;
    }

    if (existingBackAsset) {
      setErrorMessage(null);
      try {
        await deleteAsset(existingBackAsset.assetId);
        setBackRemoved(true);
      } catch (error) {
        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : '이미지 삭제에 실패했습니다.',
        );
      }
    }
  };

  const handleGoToImageGenerate = async () => {
    if (!isReady) return;

    setErrorMessage(null);
    try {
      const items: UploadProductImagesItem[] = [];
      if (frontImage) items.push({ file: frontImage, role: 'PRODUCT_FRONT' });
      if (backImage) items.push({ file: backImage, role: 'PRODUCT_BACK' });

      if (items.length > 0) {
        await uploadProductImages({ productId: selectedProduct.id, items });
      }

      const latestImages = await assetService.getProductImages(
        selectedProduct.id,
      );
      const latestFrontAsset = latestImages.find(
        (asset) => asset.assetRole === 'PRODUCT_FRONT',
      );
      const latestBackAsset = latestImages.find(
        (asset) => asset.assetRole === 'PRODUCT_BACK',
      );
      const assetIds = [
        latestFrontAsset?.assetId,
        latestBackAsset?.assetId,
      ].filter((id): id is number => id !== undefined);

      addProducts([
        {
          id: String(selectedProduct.id),
          name: selectedProduct.name,
          imageUrl: latestFrontAsset?.imageUrl,
          assetIds,
        },
      ]);
      router.push('/image-generate');
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : '이미지 업로드에 실패했습니다.',
      );
    }
  };

  return (
    <div className="flex w-full flex-col gap-[var(--gap-8)]">
      <div className="flex flex-col gap-[var(--gap-2)]">
        <Heading size="small" className="text-text-basic">
          이미지 업로드
        </Heading>
      </div>

      <ImageUploadField
        label="앞면"
        placeholder={'선택한 제품의 앞면\n상세 이미지를 업로드해 주세요.'}
        previewUrl={frontPreviewUrl}
        onUpload={handleUploadFront}
        onRemove={handleRemoveFront}
      />

      <ImageUploadField
        label="뒷면"
        placeholder={'선택한 제품의 뒷면\n상세 이미지를 업로드해 주세요.'}
        previewUrl={backPreviewUrl}
        onUpload={handleUploadBack}
        onRemove={handleRemoveBack}
      />

      {errorMessage && <InputMessage state="error" message={errorMessage} />}

      <Button
        variant="primary"
        size="medium"
        disabled={!isReady || isPending}
        onClick={handleGoToImageGenerate}
        className="w-full rounded-[var(--radius-medium1)]!"
      >
        {isPending ? '업로드 중...' : '이미지 생성하러 가기'}
      </Button>
    </div>
  );
};
