'use client';

import { useEffect, useState } from 'react';

// 드롭된 이미지 파일(objectURL)을 로드해 Konva Image에 쓸 수 있는
// HTMLImageElement로 변환한다
export const useHtmlImage = (src: string | null) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) return;

    let canceled = false;
    const img = new window.Image();

    img.onload = () => {
      if (!canceled) setImage(img);
    };
    img.onerror = () => {
      if (!canceled) setImage(null);
    };

    img.src = src;

    return () => {
      canceled = true;
    };
  }, [src]);

  return src ? image : null;
};
