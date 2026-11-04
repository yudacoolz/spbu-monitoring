type ProgressSegment = {
  value: number;
  color: string;
};

type ProgressBarProps = {
  value?: number;
  color?: string;
  segments?: ProgressSegment[];
  className?: string;
};

export default function ProgressBar({
  value = 0,
  color = "#2D805E",
  segments,
  className = "",
}: ProgressBarProps) {
  const items = segments ?? [{ value, color }];
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={`flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-[#E2EAF3] ${className}`}
      role="img"
      aria-label="Progress"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="h-full rounded-full"
          style={{
            width: `${total > 0 ? (item.value / total) * 100 : 0}%`,
            backgroundColor: item.color,
          }}
        />
      ))}
    </div>
  );
}
