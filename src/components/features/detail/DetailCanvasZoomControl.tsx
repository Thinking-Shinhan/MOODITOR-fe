'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/commons/Button';
import { Label } from '@/components/commons/Typography';
import {
  useDetailCanvasZoomStore,
  ZOOM_MIN,
  ZOOM_MAX,
} from '@/stores/detailCanvasZoomStore';

interface DetailCanvasZoomControlProps {
  className?: string;
}

export const DetailCanvasZoomControl = ({
  className = '',
}: DetailCanvasZoomControlProps) => {
  const zoom = useDetailCanvasZoomStore((state) => state.zoom);
  const zoomIn = useDetailCanvasZoomStore((state) => state.zoomIn);
  const zoomOut = useDetailCanvasZoomStore((state) => state.zoomOut);

  return (
    <div
      className={`bg-bg-white border-border-subtler flex items-center gap-[var(--gap-2)] rounded-[var(--radius-medium1)] border p-[var(--padding-2)] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] ${className}`}
    >
      <Button
        variant="secondary"
        size="xsmall"
        onClick={zoomOut}
        disabled={zoom <= ZOOM_MIN}
        aria-label="축소"
        leftIcon={<Minus size={14} />}
        className="rounded-[var(--radius-xsmall2)]!"
      />
      <Label size="small" className="text-text-basic w-[40px] text-center">
        {zoom}%
      </Label>
      <Button
        variant="secondary"
        size="xsmall"
        onClick={zoomIn}
        disabled={zoom >= ZOOM_MAX}
        aria-label="확대"
        leftIcon={<Plus size={14} />}
        className="rounded-[var(--radius-xsmall2)]!"
      />
    </div>
  );
};
