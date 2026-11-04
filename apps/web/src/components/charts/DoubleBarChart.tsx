import Card from "../ui/Card";

type DoubleBarItem = {
  label: string;
  income: number;
  cost: number;
};

type DoubleBarChartProps = {
  title: string;
  data: DoubleBarItem[];
};

export default function DoubleBarChart({ title, data }: DoubleBarChartProps) {
  const maxValue = Math.max(
    ...data.flatMap((item) => [item.income, item.cost]),
    1,
  );

  return (
    <Card
      title={title}
      action={
        <div className="flex gap-3 text-xs text-[#526B86]">
          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-sm bg-[#2D805E]" />
            Pendapatan
          </span>
          <span className="flex items-center gap-1.5">
            <i className="h-2.5 w-2.5 rounded-sm bg-[#EF2026]" />
            Biaya
          </span>
        </div>
      }
    >
      <div className="px-5 pb-4 pt-6">
        <div className="flex h-52 items-end gap-3 border-b border-[#DCE5F0] sm:gap-5">
          {data.map((item) => (
            <div
              key={item.label}
              className="flex h-full min-w-0 flex-1 items-end justify-center gap-1.5"
            >
              <div
                title={`Pendapatan: ${item.income}`}
                className="w-1/3 max-w-6 rounded-t-md bg-[#2D805E]"
                style={{
                  height: `${(item.income / maxValue) * 100}%`,
                }}
              />
              <div
                title={`Biaya: ${item.cost}`}
                className="w-1/3 max-w-6 rounded-t-md bg-[#EF2026]"
                style={{
                  height: `${(item.cost / maxValue) * 100}%`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-between gap-3 text-xs text-[#526B86]">
          {data.map((item) => (
            <span key={item.label} className="min-w-0 flex-1 text-center">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
