'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading, Body } from '@/components/commons/Typography';
import { Button } from '@/components/commons/Button';
import { InputMessage } from '@/components/commons/InputMessage';
import { ImageUploadField } from '@/components/commons/ImageUploadField';
import { useProductSelectionStore } from '@/stores/productSelectionStore';
import { useUploadProductImages } from '@/hooks/useUploadProductImages';
import { ApiError } from '@/libs/apiClient';
import type { Product } from '@/types/product';

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

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isReady = frontImage !== null && backImage !== null;

  const handleGoToImageGenerate = async () => {
    if (!frontImage || !backImage) return;

    setUploadError(null);
    try {
      await uploadProductImages({
        productId: selectedProduct.id,
        items: [
          { file: frontImage, role: 'PRODUCT_FRONT' },
          { file: backImage, role: 'PRODUCT_BACK' },
        ],
      });
      addProducts([
        { id: String(selectedProduct.id), name: selectedProduct.name },
      ]);
      router.push('/image-generate');
    } catch (error) {
      setUploadError(
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
        <Body size="medium" className="text-text-subtler">
          선택한 제품의 앞·뒷면 상세 이미지를 업로드해 주세요.
        </Body>
      </div>

      <ImageUploadField
        label="앞면"
        placeholder={'선택한 제품의 앞면\n상세 이미지를 업로드해 주세요.'}
        file={frontImage}
        onUpload={setFrontImage}
        onRemove={() => setFrontImage(null)}
      />

      <ImageUploadField
        label="뒷면"
        placeholder={'선택한 제품의 뒷면\n상세 이미지를 업로드해 주세요.'}
        file={backImage}
        onUpload={setBackImage}
        onRemove={() => setBackImage(null)}
      />

      {uploadError && <InputMessage state="error" message={uploadError} />}

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
