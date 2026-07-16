'use client';

import { useRouter } from 'next/navigation';
import { Expand } from 'lucide-react';
import { Button } from '@/components/commons/Button';
import { Body } from '@/components/commons/Typography';
import { useDetailPagePreviewStore } from '@/stores/detailPagePreviewStore';

export const DetailEditPreviewPage = () => {
  const router = useRouter();
  const imageUrl = useDetailPagePreviewStore((state) => state.imageUrl);

  const handleBack = () => {
    router.push('/detail-edit');
  };

  return (
    <div className="bg-bg-inverse flex min-h-screen w-full flex-col">
      <header className="bg-bg-white sticky top-0 z-10 flex items-center justify-end gap-[var(--gap-4)] p-[var(--padding-7)] shadow-[0px_4px_6px_rgba(0,0,0,0.08)]">
        <Button
          variant="secondary"
          size="large"
          onClick={handleBack}
          leftIcon={<Expand size={24} className="text-icon-primary-basic" />}
        />
        <Button variant="primary" size="medium" className="w-[108px]">
          저장하기
        </Button>
        <Button variant="primary" size="medium" className="w-[108px]">
          내보내기
        </Button>
      </header>

      <div className="flex flex-1 items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="상세페이지 미리보기" className="w-[879px]" />
        ) : (
          <Body size="medium" className="text-text-border-inverse">
            미리보기 이미지를 찾을 수 없어요. 편집 화면에서 다시 시도해주세요.
          </Body>
        )}
      </div>
    </div>
  );
};
