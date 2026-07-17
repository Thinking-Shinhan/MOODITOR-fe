'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TICK_INTERVAL_MS = 200;
// 이 지점부터 증가 속도를 늦춤
const SLOWDOWN_THRESHOLD = 75;
// 실제 응답이 늦어져도 100%로 보이지 않도록 여기서 멈춤
const CAP_PROGRESS = 95;

export const useFakeProgress = (active: boolean) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) return;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= CAP_PROGRESS) return CAP_PROGRESS;
        const step =
          prev < SLOWDOWN_THRESHOLD
            ? 1 + Math.random() * 1
            : 0.2 + Math.random() * 0.2;
        return Math.min(CAP_PROGRESS, prev + step);
      });
    }, TICK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const reset = useCallback(() => setProgress(0), []);

  const complete = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(100);
  }, []);

  return { progress, reset, complete };
};
