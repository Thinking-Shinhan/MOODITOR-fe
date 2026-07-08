'use client';

import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { CircleX, Trash2, FileUp } from 'lucide-react';
import { Body } from '@/components/commons/Typography';
import { Button } from '@/components/commons/Button';

interface ImageUploadFieldProps {
  label: string;
  placeholder: string;
  file: File | null;
  onUpload: (file: File) => void;
  onRemove: () => void;
  className?: string;
}

export const ImageUploadField = ({
  label,
  placeholder,
  file,
  onUpload,
  onRemove,
  className = '',
}: ImageUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) onUpload(selected);
    event.target.value = '';
  };

  return (
    <div className={`flex w-full flex-col gap-[var(--gap-4)] ${className}`}>
      <div className="flex w-full items-center justify-between">
        <Body size="medium" bold className="text-text-subtle">
          {label}
        </Body>
        {!file && (
          <div className="flex items-center gap-[var(--gap-2)]">
            <CircleX size={14} className="text-icon-danger" />
            <Body size="xsmall" bold className="text-text-danger">
              상세 이미지를 업로드해 주세요.
            </Body>
          </div>
        )}
      </div>

      {file && previewUrl ? (
        <div className="group relative h-[280px] w-full overflow-hidden rounded-[var(--radius-medium2)]">
          <img
            src={previewUrl}
            alt={label}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          <Button
            variant="secondary"
            size="xsmall"
            onClick={onRemove}
            aria-label="이미지 삭제"
            leftIcon={<Trash2 size={14} />}
            className="absolute right-[var(--padding-7)] bottom-[var(--padding-7)] rounded-[var(--radius-xsmall2)]!"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="border-btn-outline-border hover:bg-bg-gray-subtle flex h-[280px] w-full cursor-pointer flex-col items-center justify-center gap-[var(--gap-3)] rounded-[var(--radius-large1)] border-[0.8px] border-dashed px-[var(--padding-7)] py-[var(--gap-6)] transition-colors"
        >
          <FileUp size={20} className="text-icon-disabled-on" />
          <Body
            size="xsmall"
            bold
            className="text-text-disabled-on text-center whitespace-pre-line"
          >
            {placeholder}
          </Body>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
