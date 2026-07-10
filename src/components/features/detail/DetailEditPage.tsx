'use client';

import dynamic from 'next/dynamic';

const DetailEditCanvas = dynamic(
  () =>
    import('@/components/features/detail/DetailEditCanvas').then(
      (mod) => mod.DetailEditCanvas,
    ),
  { ssr: false },
);

export default function DetailEditPage() {
  return (
    <div className="bg-bg-gray-subtler flex h-full items-center justify-center">
      <DetailEditCanvas />
    </div>
  );
}
