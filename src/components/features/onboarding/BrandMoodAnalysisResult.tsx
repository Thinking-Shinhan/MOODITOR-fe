import type { ReactNode } from 'react';
import { Album, Award } from 'lucide-react';
import { Body, Heading } from '@/components/commons/Typography';
import type { BrandMoodAnalysis } from '@/types/onboarding';

interface BrandMoodAnalysisResultProps {
  analysis: BrandMoodAnalysis;
}

type StatKey =
  | 'colorTemperature'
  | 'saturation'
  | 'contrast'
  | 'lighting'
  | 'surfaceTexture'
  | 'backgroundMood'
  | 'composition';

const STAT_FIELDS: { label: string; key: StatKey }[] = [
  { label: '색온도', key: 'colorTemperature' },
  { label: '채도', key: 'saturation' },
  { label: '대비', key: 'contrast' },
  { label: '조명', key: 'lighting' },
  { label: '질감', key: 'surfaceTexture' },
  { label: '배경 무드', key: 'backgroundMood' },
  { label: '구도', key: 'composition' },
];

const CardLabel = ({ children }: { children: ReactNode }) => (
  <Body size="small" bold className="text-text-subtler w-full text-center">
    {children}
  </Body>
);

const TagList = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap items-start justify-center gap-x-[var(--gap-3)] gap-y-[var(--gap-2)]">
    {items.map((item) => (
      <Body
        key={item}
        size="xsmall"
        bold
        className="text-text-basic whitespace-nowrap"
      >
        #{item}
      </Body>
    ))}
  </div>
);

export const BrandMoodAnalysisResult = ({
  analysis,
}: BrandMoodAnalysisResultProps) => {
  return (
    <div className="flex w-[1356px] flex-col items-start gap-[var(--gap-5)]">
      <div className="flex w-full items-stretch gap-[var(--gap-5)]">
        <div className="border-border-subtler flex w-[768px] flex-col items-center justify-center gap-[var(--gap-3)] rounded-[var(--radius-xsmall2)] border px-[var(--padding-10)] py-[var(--padding-8)] text-center">
          <CardLabel>브랜드 요약</CardLabel>
          <div className="flex flex-col items-center gap-[var(--gap-3)]">
            <Heading size="xsmall" className="text-text-basic w-[200px]">
              {analysis.brandName}
            </Heading>
            <Body
              size="small"
              bold
              className="text-text-basic w-full break-keep"
            >
              {analysis.brandSummary}
            </Body>
          </div>
        </div>

        <div className="flex w-[572px] flex-col items-start gap-[var(--gap-5)]">
          <div className="border-border-subtler flex w-full items-center gap-[var(--gap-5)] rounded-[var(--radius-xsmall2)] border px-[var(--padding-7)] py-[11.75px]">
            <div className="bg-bg-gray-subtler flex size-[60px] shrink-0 items-center justify-center rounded-[var(--radius-xsmall2)]">
              <Award size={28} className="text-icon-gray-light" />
            </div>
            <div className="flex flex-1 flex-col items-start gap-[var(--gap-2)]">
              <Body size="small" bold className="text-text-subtler w-full">
                디자인 철학
              </Body>
              <Body
                size="xsmall"
                bold
                className="text-text-basic w-full break-keep"
              >
                {analysis.designPhilosophy}
              </Body>
            </div>
          </div>

          <div className="border-border-subtler flex w-full items-center gap-[var(--gap-5)] rounded-[var(--radius-xsmall2)] border px-[var(--padding-7)] py-[9.75px]">
            <div className="bg-bg-gray-subtler flex size-[60px] shrink-0 items-center justify-center rounded-[var(--radius-xsmall2)]">
              <Album size={28} className="text-icon-gray-light" />
            </div>
            <div className="flex flex-1 flex-col items-start gap-[var(--gap-2)]">
              <Body size="small" bold className="text-text-subtler w-full">
                브랜드 톤
              </Body>
              <div className="flex w-full flex-wrap items-start gap-x-[var(--gap-3)] gap-y-[var(--gap-2)]">
                {analysis.brandTone.map((tone) => (
                  <Body
                    key={tone}
                    size="xsmall"
                    bold
                    className="text-text-basic whitespace-nowrap"
                  >
                    #{tone}
                  </Body>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-stretch gap-[var(--gap-5)]">
        {STAT_FIELDS.map(({ label, key }) => (
          <div
            key={key}
            className="border-border-subtler flex w-[180px] flex-col items-center gap-[var(--gap-3)] rounded-[var(--radius-xsmall2)] border p-[var(--padding-7)] text-center"
          >
            <CardLabel>{label}</CardLabel>
            <Body size="xsmall" bold className="text-text-basic w-full">
              {analysis[key]}
            </Body>
          </div>
        ))}
      </div>

      <div className="flex w-full items-stretch gap-[var(--gap-5)]">
        <div className="border-border-subtler flex flex-1 flex-col items-center gap-[var(--gap-3)] rounded-[var(--radius-xsmall2)] border p-[var(--padding-7)]">
          <CardLabel>피해야 할 요소</CardLabel>
          <TagList items={analysis.avoidElements} />
        </div>
        <div className="border-border-subtler flex flex-1 flex-col items-center gap-[var(--gap-3)] rounded-[var(--radius-xsmall2)] border p-[var(--padding-7)] text-center">
          <CardLabel>추가 유의사항</CardLabel>
          <Body
            size="xsmall"
            bold
            className="text-text-basic w-full break-keep"
          >
            {analysis.customBrandNote}
          </Body>
        </div>
      </div>
    </div>
  );
};
