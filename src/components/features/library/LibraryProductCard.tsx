import { Body } from '@/components/commons/Typography';

interface LibraryProductCardProps {
  productName: string;
  images: string[];
  modelCutCount: number;
  productCutCount: number;
  detailPageCount: number;
  totalImageCount: number;
  createdAt: string;
}

interface ImageCountBadgeProps {
  label: string;
  count: number;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const ImageCountBadge = ({ label, count }: ImageCountBadgeProps) => (
  <div className="bg-btn-secondary-fill-hovered flex shrink-0 items-center gap-[var(--gap-2)] rounded-[var(--radius-small1)] px-[var(--padding-3)] py-[var(--padding-2)]">
    <Body size="xsmall" bold className="text-text-primary-basic">
      {label}
    </Body>
    <Body size="xsmall" bold className="text-text-primary-basic">
      {count}
    </Body>
  </div>
);

export const LibraryProductCard = ({
  productName,
  images,
  modelCutCount,
  productCutCount,
  detailPageCount,
  totalImageCount,
  createdAt,
}: LibraryProductCardProps) => {
  const [mainImage, subImage1, subImage2] = images;

  return (
    <div className="bg-bg-white border-border-subtler flex w-[267px] cursor-pointer flex-col overflow-hidden rounded-[var(--radius-medium2)] border shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-[var(--gap-3)]">
        <div className="bg-bg-gray-subtle h-[184px] w-[143px] shrink-0">
          {mainImage && (
            <img src={mainImage} alt="" className="size-full object-cover" />
          )}
        </div>
        <div className="flex h-[184px] w-[116px] shrink-0 flex-col gap-[7.2px]">
          <div className="bg-bg-gray-subtle relative min-h-0 flex-1">
            {subImage1 && (
              <img
                src={subImage1}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            )}
          </div>
          <div className="bg-bg-gray-subtle relative min-h-0 flex-1">
            {subImage2 && (
              <img
                src={subImage2}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[var(--gap-4)] p-[var(--padding-6)]">
        <Body
          size="medium"
          bold
          className="text-text-basic line-clamp-2 h-[48px] w-full"
        >
          {productName}
        </Body>
        <div className="flex items-center gap-[var(--gap-3)]">
          <ImageCountBadge label="모델컷" count={modelCutCount} />
          <ImageCountBadge label="제품컷" count={productCutCount} />
          <ImageCountBadge label="상세페이지" count={detailPageCount} />
        </div>
        <div className="flex items-start gap-[var(--gap-3)]">
          <Body size="xsmall" className="text-text-basic w-[60px] shrink-0">
            총 {totalImageCount}장
          </Body>
          <Body size="xsmall" className="text-text-basic whitespace-nowrap">
            {formatDate(createdAt)}
          </Body>
        </div>
      </div>
    </div>
  );
};
