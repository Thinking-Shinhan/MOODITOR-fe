'use client';

import { useEffect, useState } from 'react';

export const useHtmlImage = (src: string | null) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) return;

    let canceled = false;
    const img = new window.Image();

    img.crossOrigin = 'anonymous';

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
