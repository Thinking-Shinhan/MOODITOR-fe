interface StepBadgeProps {
  number: number;
  className?: string;
}

export const StepBadge = ({ number, className = '' }: StepBadgeProps) => (
  <div
    className={`bg-btn-primary-fill flex size-5 shrink-0 items-center justify-center rounded-full ${className}`}
  >
    <span className="text-text-border-inverse text-[12px] leading-normal font-bold">
      {number}
    </span>
  </div>
);
