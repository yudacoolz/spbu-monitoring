import Card from "../ui/Card";

type LineChartProps = {
  title: string;
  data: { label: string; value: number }[];
  summary?: string;
};

export default function LineChart({ title, data, summary }: LineChartProps) {
  const width = 600;
  const height = 190;
  const padding = 12;

  const max = Math.max(...data.map((item) => item.value), 1);
  const min = Math.min(...data.map((item) => item.value), 0);
  const range = max - min || 1;

  const points = data.map((item, index) => ({
    x: padding + (index / Math.max(data.length - 1, 1)) * (width - padding * 2),
    y: height - padding - ((item.value - min) / range) * (height - padding * 2),
  }));

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${width - padding} ${height} L ${padding} ${height} Z`;

  return (
    <Card
      title={title}
      action={
        summary ? (
          <span className="text-xs text-[#526B86]">{summary}</span>
        ) : undefined
      }
    >
      <div className="px-4 pb-4 pt-5">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-52 w-full overflow-visible"
          preserveAspectRatio="none"
          role="img"
          aria-label={title}
        >
          <line
            x1={padding}
            y1={height}
            x2={width - padding}
            y2={height}
            stroke="#DCE5F0"
            strokeDasharray="4 4"
          />

          <path d={areaPath} fill="#2D805E" opacity="0.09" />

          <path
            d={linePath}
            fill="none"
            stroke="#2D805E"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="mt-2 flex justify-between gap-2 text-[11px] text-[#7890AA]">
          {data
            .filter(
              (_, index) =>
                index === 0 ||
                index === data.length - 1 ||
                index % Math.max(Math.ceil(data.length / 5), 1) === 0,
            )
            .map((item) => (
              <span key={item.label}>{item.label}</span>
            ))}
        </div>
      </div>
    </Card>
  );
}
