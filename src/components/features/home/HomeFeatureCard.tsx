import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Body, Heading } from '@/components/commons/Typography';

interface HomeFeatureCardProps {
  href: string;
  title: string;
  description: string;
}

export const HomeFeatureCard = ({
  href,
  title,
  description,
}: HomeFeatureCardProps) => (
  <Link
    href={href}
    className="bg-bg-gray-subtler hover:bg-bg-gray-subtle active:bg-bg-gray-subtle active:border-btn-outline-border-pressed flex h-full flex-1 flex-col items-end gap-[var(--gap-7)] rounded-[var(--radius-medium2)] border border-transparent p-[var(--padding-9)] transition-colors"
  >
    <div className="flex w-full flex-col items-start gap-[var(--gap-3)]">
      <Heading size="medium" className="text-text-basic">
        {title}
      </Heading>
      <Body
        size="large"
        className="text-text-subtle w-full whitespace-pre-line"
      >
        {description}
      </Body>
    </div>
    <span className="bg-icon-gray flex size-[40px] shrink-0 items-center justify-center rounded-[var(--radius-max)]">
      <ChevronRight size={18} className="text-icon-inverse" />
    </span>
  </Link>
);
