import { Body, Heading } from '@/components/commons/Typography';

interface HomeBrandSummaryCardProps {
  brandName: string;
  brandSummary: string | null;
  designPhilosophy: string | null;
  toneKeywords: string[];
}

export const HomeBrandSummaryCard = ({
  brandName,
  brandSummary,
  designPhilosophy,
  toneKeywords,
}: HomeBrandSummaryCardProps) => (
  <div className="bg-bg-inverse flex flex-1 flex-col items-start gap-[var(--gap-8)] self-stretch rounded-[var(--radius-large1)] p-[var(--padding-9)]">
    <div className="flex w-full flex-col items-start gap-[var(--gap-5)]">
      <span className="bg-btn-secondary-fill border-border-border flex items-center justify-center rounded-[var(--radius-max)] border px-[var(--padding-5)] py-[var(--padding-2)]">
        <Body size="small" className="text-text-border whitespace-nowrap">
          브랜드 분석 완료
        </Body>
      </span>
      <div className="flex w-full flex-col items-start gap-[var(--gap-2)]">
        <Heading size="large" className="text-text-border-inverse w-full">
          {brandName}
        </Heading>
        {brandSummary && (
          <Heading
            size="medium"
            className="text-text-border-inverse w-full break-keep whitespace-pre-line"
          >
            {brandSummary}
          </Heading>
        )}
      </div>
    </div>

    <div className="flex w-full flex-col items-start gap-[var(--gap-7)]">
      {designPhilosophy && (
        <div className="flex w-full flex-col items-start gap-[var(--gap-2)]">
          <Body size="small" className="text-text-border-inverse w-full">
            디자인 철학
          </Body>
          <Body
            size="small"
            bold
            className="text-text-border-inverse w-full break-keep"
          >
            {designPhilosophy}
          </Body>
        </div>
      )}
      {toneKeywords.length > 0 && (
        <div className="flex w-full flex-col items-start gap-[var(--gap-2)]">
          <Body size="small" className="text-text-border-inverse w-full">
            브랜드 톤
          </Body>
          <div className="flex flex-wrap items-start gap-[var(--gap-4)]">
            {toneKeywords.map((tone) => (
              <Body
                key={tone}
                size="small"
                bold
                className="text-text-border-inverse whitespace-nowrap"
              >
                #{tone}
              </Body>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
