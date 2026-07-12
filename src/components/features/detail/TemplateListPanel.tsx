'use client';

import { DragEvent } from 'react';
import { Body } from '@/components/commons/Typography';
import { TemplateThumbnailCard } from '@/components/features/detail/TemplateThumbnailCard';
import type { DetailTemplate, DetailTemplateType } from '@/types/template';

const TEMPLATE_LABELS: Record<DetailTemplateType, string> = {
  IMAGE_1_1: '이미지 1장 (세로)',
  IMAGE_1_2: '이미지 1장 (가로)',
  IMAGE_2_1: '이미지 2장 (가로 배치)',
  IMAGE_2_2: '이미지 2장 (세로 배치)',
  IMAGE_3_1: '이미지 3장 (2단 + 1단)',
  IMAGE_3_2: '이미지 3장 (1단 + 2단)',
  IMAGE_4_1: '이미지 4장 (2x2, 세로형)',
  IMAGE_4_2: '이미지 4장 (2x2, 가로형)',
  TEXT_1: '텍스트 1줄',
  TEXT_2: '텍스트 2줄',
  TEXT_3: '텍스트 3줄',
  TEXT_4: '텍스트 4줄',
  TEXT_5: '텍스트 5줄',
  MATERIAL: '소재 인포메이션',
  SIZE_TIP: '사이즈 팁',
  SIZE_INFO: '사이즈 인포메이션',
};

// TODO: 실제 템플릿 목록 API 연동 후 제거
const TEMPLATE_GROUPS: { label: string; types: DetailTemplateType[] }[] = [
  {
    label: '이미지 템플릿',
    types: [
      'IMAGE_1_1',
      'IMAGE_1_2',
      'IMAGE_2_1',
      'IMAGE_2_2',
      'IMAGE_3_1',
      'IMAGE_3_2',
      'IMAGE_4_1',
      'IMAGE_4_2',
    ],
  },
  {
    label: '텍스트 템플릿',
    types: ['TEXT_1', 'TEXT_2', 'TEXT_3', 'TEXT_4', 'TEXT_5'],
  },
  {
    label: '소재 인포메이션 템플릿',
    types: ['MATERIAL'],
  },
  {
    label: '사이즈 인포메이션 템플릿',
    types: ['SIZE_TIP', 'SIZE_INFO'],
  },
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
    <div className="border-border-subtler bg-bg-white flex w-[360px] shrink-0 flex-col gap-[var(--gap-8)] overflow-y-auto border-r p-[var(--padding-6)]">
      <Body size="medium" bold className="text-text-subtle">
        템플릿
      </Body>
      {TEMPLATE_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-[var(--gap-4)]">
          <Body size="medium" bold className="text-text-subtle">
            {group.label}
          </Body>
          <div className="flex flex-col gap-[var(--gap-5)]">
            {group.types.map((type) => {
              const template: DetailTemplate = {
                id: type,
                type,
                label: TEMPLATE_LABELS[type],
              };
              return (
                <TemplateThumbnailCard
                  key={type}
                  type={type}
                  label={template.label}
                  draggable
                  onDragStart={(event) => handleDragStart(event, template)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
