'use client';

import { useEffect, useMemo } from 'react';

export const useObjectUrl = (file: File | null): string | null => {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  return url;
};
