'use client';

import { useState } from 'react';
import { Check, Expand, WandSparkles } from 'lucide-react';
import { AlertModal } from '@/components/commons/AlertModal';
import { Button } from '@/components/commons/Button';
import { Body } from '@/components/commons/Typography';
import { Tooltip } from '@/components/commons/Tooltip';

interface DetailEditHeaderProps {
  className?: string;
}

export const DetailEditHeader = ({ className = '' }: DetailEditHeaderProps) => {
  const [aiTooltipOpen, setAiTooltipOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  return (
    <header
      className={`bg-bg-white border-border-subtle flex items-center justify-between border-b p-[var(--padding-7)] ${className}`}
    >
      <div className="flex items-center gap-[var(--gap-3)]">
        <div
          onMouseEnter={() => setAiTooltipOpen(true)}
          onMouseLeave={() => setAiTooltipOpen(false)}
          className="relative flex shrink-0 items-center"
        >
          <button
            type="button"
            className="bg-btn-secondary-fill border-border-subtle flex items-center gap-[var(--gap-3)] rounded-[var(--radius-max)] border px-[var(--padding-5)] py-[var(--padding-3)]"
          >
            <WandSparkles size={16} className="text-icon-gray-light" />
            <Body size="small" bold className="text-text-subtler">
              AI 자동 배치
            </Body>
          </button>
          {aiTooltipOpen && (
            <Tooltip
              text="이미지와 텍스트를 모두 배치하면 더 완성도가 높아져요."
              placement="right"
              className="absolute top-1/2 left-full ml-[var(--gap-3)] -translate-y-1/2"
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-[var(--gap-4)]">
        <Button
          variant="secondary"
          size="large"
          leftIcon={<Expand size={24} className="text-icon-primary-basic" />}
        />
        <Button
          variant="primary"
          size="medium"
          className="w-[108px]"
          onClick={() => setSaveModalOpen(true)}
        >
          저장하기
        </Button>
        <Button
          variant="primary"
          size="medium"
          className="w-[108px]"
          onClick={() => setExportModalOpen(true)}
        >
          내보내기
        </Button>
      </div>

      <AlertModal
        open={saveModalOpen}
        title="저장 완료!"
        description="저장한 이미지는 라이브러리에서 확인할 수 있어요."
        icon={
          <Check size={20} strokeWidth={1.3} className="text-icon-inverse" />
        }
        onConfirm={() => setSaveModalOpen(false)}
      />
      <AlertModal
        open={exportModalOpen}
        title="내보내기 완료!"
        description="이미지를 성공적으로 내보냈어요."
        icon={
          <Check size={20} strokeWidth={1.3} className="text-icon-inverse" />
        }
        onConfirm={() => setExportModalOpen(false)}
      />
    </header>
  );
};
