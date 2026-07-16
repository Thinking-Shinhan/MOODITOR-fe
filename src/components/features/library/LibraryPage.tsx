'use client';

import { Heading, Body } from '@/components/commons/Typography';
import { Spinner } from '@/components/commons/Spinner';
import { LibraryProductCard } from '@/components/features/library/LibraryProductCard';
import { useImageFolders } from '@/hooks/useImageFolders';

// TODO: /library/image-folders 응답에 모델컷/제품컷/상세페이지 개수와 생성일이 아직 없어서, 백엔드가 필드를 추가해줄 때까지 목업 값으로 채움
const MOCK_MODEL_CUT_COUNT = 8;
const MOCK_PRODUCT_CUT_COUNT = 4;
const MOCK_DETAIL_PAGE_COUNT = 1;
const MOCK_CREATED_AT = '2026-07-14T00:00:00';

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
          <div className="grid w-full grid-cols-[repeat(4,minmax(0,1fr))] gap-x-[var(--gap-6)] gap-y-[var(--gap-6)]">
            {imageFolders.map((folder) => (
              <LibraryProductCard
                key={folder.productId}
                productName={folder.productName}
                images={folder.thumbnailUrl ? [folder.thumbnailUrl] : []}
                modelCutCount={MOCK_MODEL_CUT_COUNT}
                productCutCount={MOCK_PRODUCT_CUT_COUNT}
                detailPageCount={MOCK_DETAIL_PAGE_COUNT}
                totalImageCount={folder.assetCount}
                createdAt={MOCK_CREATED_AT}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
