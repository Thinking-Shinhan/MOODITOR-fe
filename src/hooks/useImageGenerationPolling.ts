'use client';

import { useEffect, useRef, useState } from 'react';
import { useImageGenerationJob } from '@/hooks/useImageGenerationJob';
import type { ImageGenerationJob } from '@/types/imageGenerationJob';

interface UseImageGenerationPollingOptions {
  onSucceeded: (job: ImageGenerationJob) => void;
  onFailed: (job: ImageGenerationJob) => void;
}

export const useImageGenerationPolling = ({
  onSucceeded,
  onFailed,
}: UseImageGenerationPollingOptions) => {
  const [jobId, setJobId] = useState<number | null>(null);
  const [seedJob, setSeedJob] = useState<ImageGenerationJob | null>(null);
  const { data } = useImageGenerationJob(jobId);

  // 최초 폴링 전에도 job 생성 응답을 즉시 보여주기 위한 시드값이며,
  // 폴링 데이터가 도착하면 그 값이 우선한다.
  const job = data ?? seedJob;

  // onSucceeded/onFailed는 매 렌더마다 새로 만들어지는 인라인 함수라
  // effect의 의존성으로 두면 data와 무관하게 재실행된다. ref로 최신 값만 참조한다.
  const onSucceededRef = useRef(onSucceeded);
  const onFailedRef = useRef(onFailed);
  useEffect(() => {
    onSucceededRef.current = onSucceeded;
    onFailedRef.current = onFailed;
  });

  // 종료된 job을 refetchOnWindowFocus 등으로 다시 받아도 콜백이 중복 호출되지 않도록,
  // 이미 처리한 jobId를 기억해둔다.
  const handledJobIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!data) return;
    if (data.status !== 'SUCCEEDED' && data.status !== 'FAILED') return;
    if (handledJobIdRef.current === data.jobId) return;

    handledJobIdRef.current = data.jobId;

    if (data.status === 'SUCCEEDED') {
      onSucceededRef.current(data);
    } else {
      onFailedRef.current(data);
    }
  }, [data]);

  const startPolling = (initialJob: ImageGenerationJob) => {
    handledJobIdRef.current = null;
    setSeedJob(initialJob);
    setJobId(initialJob.jobId);
  };

  // 새 생성 요청을 보내기 전에 호출해서 이전 job(완료된 100% 상태)이
  // 새 요청의 job 생성 API 응답을 기다리는 동안 잠깐 보이는 걸 막는다
  const reset = () => {
    handledJobIdRef.current = null;
    setSeedJob(null);
    setJobId(null);
  };

  return { job, startPolling, reset };
};
