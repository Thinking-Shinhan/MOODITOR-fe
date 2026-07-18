import { Link2 } from 'lucide-react';
import { Body, Heading, Label } from '@/components/commons/Typography';
import { HomeFeatureCard } from '@/components/features/home/HomeFeatureCard';

const FEATURE_CARDS = [
  {
    href: '/onboarding',
    title: '브랜드 무드 분석하기',
    description:
      '브랜드의 톤앤매너를 분석해\n일관된 브랜드 콘텐츠를 제작할 수 있어요.',
  },
  {
    href: '/image-generate',
    title: '이미지 만들기',
    description: '브랜드 무드에 맞는\n모델컷과 제품컷을 AI로 제작해보세요.',
  },
  {
    href: '/detail-edit',
    title: '상세페이지 편집',
    description: '우리 브랜드에 최적화된\n상세페이지를 자유롭게 만들어보세요.',
  },
];

export default function HomePage() {
  return (
    <div className="flex h-full justify-center px-[60px] pt-[173px]">
      <div className="flex w-[1244px] flex-col items-start gap-[var(--gap-8)]">
        <div className="flex flex-col items-start gap-[var(--gap-3)]">
          <Heading size="small" className="text-text-basic">
            안녕하세요.
          </Heading>
          <Heading size="large" className="text-text-basic whitespace-pre-line">
            {
              'Mooditor가 브랜드 무드에 맞는 이미지를 제작하고,\n상세페이지까지 완성해 드려요!'
            }
          </Heading>
        </div>

        <div className="flex w-full flex-col items-start gap-[var(--gap-7)]">
          <div className="flex w-full items-start gap-[var(--gap-6)]">
            {FEATURE_CARDS.map((card) => (
              <HomeFeatureCard
                key={card.href}
                href={card.href}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>

          <div className="bg-btn-secondary-fill-hovered flex w-full items-center justify-between px-[var(--padding-5)] py-[var(--padding-4)]">
            <div className="flex items-center gap-[var(--gap-4)]">
              <span className="bg-btn-primary-fill flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-small1)]">
                <Link2 size={16} className="text-icon-inverse" />
              </span>
              <div className="flex flex-col items-start gap-[var(--gap-1)]">
                <Body size="small" bold className="text-text-basic">
                  브랜드 상품을 연동해주세요.
                </Body>
                <Label size="xsmall" className="text-text-basic">
                  상품을 연동하면 브랜드에 맞는 이미지와 상세페이지를 더욱 쉽게
                  제작할 수 있어요.
                </Label>
              </div>
            </div>
            <button
              type="button"
              className="bg-btn-secondary-fill border-btn-secondary-border rounded-[var(--radius-xsmall2)] border px-[var(--padding-4)] py-[var(--size-height-2)]"
            >
              <Body size="xsmall" bold className="text-text-primary-basic">
                상품 연동하기
              </Body>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
