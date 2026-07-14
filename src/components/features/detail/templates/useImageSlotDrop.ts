'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import type Konva from 'konva';

interface DroppableSlot {
  id: string;
  type: 'image' | 'text';
}

// 이미지 슬롯 위에 파일을 드래그앤드롭하면 해당 슬롯에 이미지를 채운다.
// Konva Stage는 캔버스 하나로 렌더링돼서 슬롯마다 별도의 네이티브 드롭
// 타겟을 둘 수 없어, 스테이지 컨테이너에 리스너를 걸고 드롭 좌표로
// getIntersection을 이용해 어느 슬롯인지 찾는다.
export const useImageSlotDrop = <T extends DroppableSlot>(
  rootRef: RefObject<Konva.Group | null>,
  templateId: string,
  slots: readonly T[],
) => {
  const [images, setImages] = useState<Record<string, string>>({});
  const activeUrlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const prev = activeUrlsRef.current;
    const next = new Set(Object.values(images));

    prev.forEach((url) => {
      if (!next.has(url)) URL.revokeObjectURL(url);
    });

    activeUrlsRef.current = next;
  }, [images]);

  useEffect(() => {
    return () => {
      activeUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    const container = rootRef.current?.getStage()?.container();
    if (!container) return;

    const imageSlots = slots.filter((slot) => slot.type === 'image');
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();

      const file = event.dataTransfer?.files?.[0];
      if (!file || !file.type.startsWith('image/')) return;

      const stage = rootRef.current?.getStage();
      if (!stage) return;

      const containerRect = container.getBoundingClientRect();
      const pointerPosition = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      };
      const target = stage.getIntersection(pointerPosition);
      const slot = imageSlots.find(
        (candidate) => target?.name() === `slot-${templateId}-${candidate.id}`,
      );
      if (!slot) return;

      const objectUrl = URL.createObjectURL(file);
      setImages((prev) => ({ ...prev, [slot.id]: objectUrl }));
    };

    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);

    return () => {
      container.removeEventListener('dragover', handleDragOver);
      container.removeEventListener('drop', handleDrop);
    };
  }, [rootRef, templateId, slots]);

  return images;
};
