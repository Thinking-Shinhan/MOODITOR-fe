'use client';

import dynamic from 'next/dynamic';
import { TemplateListPanel } from '@/components/features/detail/TemplateListPanel';

const DetailEditCanvas = dynamic(
  () =>
    import('@/components/features/detail/DetailEditCanvas').then(
      (mod) => mod.DetailEditCanvas,
    ),
  { ssr: false },
);

export default function DetailEditPage() {
  return (
    <div className="flex h-full">
      <TemplateListPanel />
      <div className="bg-bg-gray-subtler flex flex-1 flex-col items-center overflow-auto px-[60px] pt-[104px]">
        <DetailEditCanvas />
        <div className="h-[240px] w-full shrink-0" />
      </div>
    </div>
  );
}
