'use client';

import { DragEvent } from 'react';
import { Body } from '@/components/commons/Typography';
import type { DetailTemplate } from '@/types/template';

// TODO: 실제 템플릿 목록 API 연동 후 제거
const DUMMY_TEMPLATES: DetailTemplate[] = [
  { id: 'image-2col', type: 'IMAGE_2COL', label: '이미지 2컷' },
  { id: 'image-3col', type: 'IMAGE_3COL', label: '이미지 3컷' },
  { id: 'text-1col', type: 'TEXT_1COL', label: '텍스트 1단' },
];

const handleDragStart = (
  event: DragEvent<HTMLDivElement>,
  template: DetailTemplate,
) => {
  event.dataTransfer.setData('application/json', JSON.stringify(template));
  event.dataTransfer.effectAllowed = 'copy';
};

export const TemplateListPanel = () => {
  return (
    <div className="border-border-subtler bg-bg-white flex w-60 shrink-0 flex-col gap-[var(--gap-5)] overflow-y-auto border-r p-[var(--padding-6)]">
      <Body size="medium" bold className="text-text-subtle">
        템플릿
      </Body>
      <div className="flex flex-col gap-[var(--gap-3)]">
        {DUMMY_TEMPLATES.map((template) => (
          <div
            key={template.id}
            draggable
            onDragStart={(event) => handleDragStart(event, template)}
            className="border-border-subtler bg-bg-gray-subtler cursor-grab rounded-[var(--radius-medium1)] border px-[var(--padding-5)] py-[var(--padding-4)] active:cursor-grabbing"
          >
            <Body size="small" className="text-text-basic">
              {template.label}
            </Body>
          </div>
        ))}
      </div>
    </div>
  );
};
