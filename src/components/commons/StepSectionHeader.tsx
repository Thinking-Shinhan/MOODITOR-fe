import { Heading } from '@/components/commons/Typography';
import { StepBadge } from '@/components/commons/StepBadge';

interface StepSectionHeaderProps {
  number: number;
  title: string;
}

export const StepSectionHeader = ({
  number,
  title,
}: StepSectionHeaderProps) => (
  <div className="flex items-center gap-[var(--gap-3)]">
    <StepBadge number={number} />
    <Heading size="xsmall">{title}</Heading>
  </div>
);
