'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TICK_INTERVAL_MS = 200;
// 이 지점부터 증가 속도를 늦춤
const SLOWDOWN_THRESHOLD = 70;
// 가짜 증가분은 여기서 멈추고, 이후로는 실제 값이 와야만 넘어감
const CAP_PROGRESS = 90;

// 폴링 사이 간격 동안 진행률이 멈춰 보이지 않도록, 실제 값과 별개로 조금씩 증가하는 가짜 진행률을 보여줌
// 실제 값이 도착하면: 가짜 값보다 작으면 무시(뒤로 가지 않음), 크면 그 값까지 즉시 따라잡음
export const useSmoothedProgress = (realProgress: number, active: boolean) => {
  const [fakeProgress, setFakeProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) return;

    intervalRef.current = setInterval(() => {
      setFakeProgress((prev) => {
        if (prev >= CAP_PROGRESS) return prev;
        const step =
          prev < SLOWDOWN_THRESHOLD
            ? 0.2 + Math.random() * 0.3
            : 0.2 + Math.random() * 0.15;
        return Math.min(CAP_PROGRESS, prev + step);
      });
    }, TICK_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const reset = useCallback(() => setFakeProgress(0), []);

  // 실제 값이 가짜 값보다 크면 그 값까지 즉시 따라잡고, 작으면 가짜 값을 유지
  const progress = Math.max(fakeProgress, realProgress);

  return { progress, reset };
};
