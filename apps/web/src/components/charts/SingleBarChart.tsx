import Card from "../ui/Card";

type ChartItem = {
  label: string;
  value: number;
};

type SingleBarChartProps = {
  title: string;
  data: ChartItem[];
  summary?: string;
};

export default function SingleBarChart({
  title,
  data,
  summary,
}: SingleBarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <Card
      title={title}
      action={
        summary ? (
          <span className="text-xs text-[#526B86]">{summary}</span>
        ) : undefined
      }
    >
      <div className="px-5 pb-4 pt-6">
        <div className="flex h-44 items-end gap-2 border-b border-[#DCE5F0] sm:gap-3">
          {data.map((item) => (
            <div
              key={item.label}
              className="flex h-full min-w-0 flex-1 flex-col justify-end"
              title={`${item.label}: ${item.value}`}
            >
              <div
                className="w-full rounded-t-md bg-[#A9C1DE] transition hover:bg-[#86A8D2]"
                style={{
                  height: `${Math.max((item.value / maxValue) * 100, 2)}%`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-between gap-2 text-[11px] text-[#526B86]">
          {data.map((item) => (
            <span key={item.label} className="min-w-0 truncate">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
