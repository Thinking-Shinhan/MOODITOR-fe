'use client';

import Link from 'next/link';
import { Heading, Body } from '@/components/commons/Typography';
import { Spinner } from '@/components/commons/Spinner';
import { LibraryProductCard } from '@/components/features/library/LibraryProductCard';
import { useImageFolders } from '@/hooks/useImageFolders';

export const LibraryPage = () => {
  const { data, isLoading, isError } = useImageFolders();
  const imageFolders = data?.imageFolders ?? [];

  return (
    <div className="flex w-full flex-col items-start p-[var(--padding-9)]">
      <div className="flex w-full flex-col gap-[var(--gap-8)]">
        <div className="flex flex-col gap-[var(--gap-2)]">
          <Heading size="small" className="text-text-basic">
            라이브러리
          </Heading>
          <Body size="medium" className="text-text-subtler">
            저장한 이미지와 상세페이지를 한곳에서 확인해 보세요.
          </Body>
        </div>

        {isLoading && (
          <div className="flex w-full items-center justify-center py-12">
            <Spinner size="large" />
          </div>
        )}
        {isError && (
          <Body size="xsmall" className="text-icon-danger">
            라이브러리를 불러오지 못했습니다.
          </Body>
        )}
        {!isLoading && !isError && imageFolders.length === 0 && (
          <Body size="medium" className="text-text-subtler">
            저장된 이미지가 없습니다.
          </Body>
        )}
        {!isLoading && !isError && imageFolders.length > 0 && (
          <div className="grid w-full grid-cols-[repeat(auto-fill,267px)] gap-[var(--gap-6)]">
            {imageFolders.map((folder) => (
              <Link
                key={folder.productId}
                href={`/library/${folder.productId}`}
                className="contents"
              >
                <LibraryProductCard
                  productName={folder.productName}
                  images={folder.previewImages.map((image) => image.imageUrl)}
                  modelCutCount={folder.counts.modelCut}
                  productCutCount={folder.counts.productCut}
                  detailPageCount={folder.counts.detailPage}
                  totalImageCount={folder.counts.total}
                  createdAt={folder.updatedAt}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
