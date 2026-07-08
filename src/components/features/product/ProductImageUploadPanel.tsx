'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading, Body } from '@/components/commons/Typography';
import { Button } from '@/components/commons/Button';
import { ImageUploadField } from '@/components/commons/ImageUploadField';
import { useProductSelectionStore } from '@/stores/productSelectionStore';
import type { Product } from '@/types/product';

interface ProductImageUploadPanelProps {
  selectedProducts: Product[];
}

export const ProductImageUploadPanel = ({
  selectedProducts,
}: ProductImageUploadPanelProps) => {
  const router = useRouter();
  const addProducts = useProductSelectionStore((state) => state.addProducts);
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);

  const isReady = frontImage !== null && backImage !== null;

  const handleGoToImageGenerate = () => {
    addProducts(
      selectedProducts.map((product) => ({
        id: String(product.id),
        name: product.name,
      })),
    );
    router.push('/image-generate');
  };

  return (
    <div className="flex w-[458px] flex-col gap-[var(--gap-8)]">
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

      <Button
        variant="primary"
        size="medium"
        disabled={!isReady}
        onClick={handleGoToImageGenerate}
        className="w-full rounded-[var(--radius-medium1)]!"
      >
        이미지 생성하러 가기
      </Button>
    </div>
  );
};
