'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { File as FileIcon } from 'lucide-react';
import { Body } from '@/components/commons/Typography';

interface BrandFileDropzoneProps {
  file: File | null;
  onSelect: (file: File) => void;
}

export const BrandFileDropzone = ({
  file,
  onSelect,
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
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          'flex h-[160px] w-[660px] cursor-pointer flex-col items-center justify-center gap-[var(--gap-3)]',
          'rounded-[var(--radius-large1)] border-[0.8px] border-dashed px-[var(--padding-7)] py-[var(--gap-6)] transition-colors',
          isDragOver
            ? 'bg-bg-gray-subtle'
            : 'border-btn-outline-border hover:bg-bg-gray-subtle',
        ].join(' ')}
      >
        <FileIcon size={20} className="text-icon-disabled-on" />
        <Body size="small" bold className="text-text-disabled-on text-center">
          {file ? file.name : '파일을 드래그하거나 선택해 주세요.'}
        </Body>
      </button>

      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
