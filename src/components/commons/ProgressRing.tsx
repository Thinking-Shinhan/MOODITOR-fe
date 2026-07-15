interface ProgressRingProps {
  progress: number;
  size?: number;
  className?: string;
}

export const ProgressRing = ({
  progress,
  size = 110,
  className = '',
}: ProgressRingProps) => {
  const clamped = Math.min(100, Math.max(0, progress));
  const strokeWidth = size * (10 / 110);
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-orange-5"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="stroke-btn-secondary-border transition-[stroke-dashoffset] duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-text-basic text-[24px] leading-[1.5] font-bold">
          {Math.round(clamped)}%
        </span>
      </div>
    </div>
  );
};
