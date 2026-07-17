'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { File as FileIcon, Trash2 } from 'lucide-react';
import { Body } from '@/components/commons/Typography';

interface BrandFileDropzoneProps {
  file: File | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
}

export const BrandFileDropzone = ({
  file,
  onSelect,
  onRemove,
}: BrandFileDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) onSelect(selected);
    event.target.value = '';
  };

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) onSelect(dropped);
  };

  return (
    <div className="flex w-[660px] flex-col items-start gap-[var(--gap-6)]">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          'flex h-[160px] w-full cursor-pointer flex-col items-center justify-center gap-[var(--gap-3)]',
          'rounded-[var(--radius-large1)] border-[0.8px] border-dashed px-[var(--padding-7)] py-[var(--gap-6)] transition-colors',
          isDragOver
            ? 'bg-bg-gray-subtle'
            : 'border-btn-outline-border hover:bg-bg-gray-subtle',
        ].join(' ')}
      >
        <FileIcon size={20} className="text-icon-disabled-on" />
        <Body size="small" bold className="text-text-disabled-on text-center">
          파일을 드래그하거나 선택해 주세요.
        </Body>
      </button>

      {file && (
        <div className="flex w-full flex-col items-start gap-[var(--gap-3)]">
          <Body size="medium" bold className="text-text-basic">
            업로드된 파일
          </Body>
          <div className="bg-bg-gray-subtler flex w-full items-center justify-between rounded-[var(--radius-large2)] px-[var(--padding-6)] py-[var(--padding-4)]">
            <Body
              size="small"
              bold
              className="text-text-subtler w-[378px] truncate"
            >
              {file.name}
            </Body>
            <button
              type="button"
              onClick={onRemove}
              aria-label="업로드한 파일 삭제"
              className="bg-btn-secondary-fill flex size-[30px] shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-xsmall2)]"
            >
              <Trash2 size={14} className="text-icon-gray-light" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
