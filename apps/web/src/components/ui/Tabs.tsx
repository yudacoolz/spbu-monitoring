type TabItem = {
  label: string;
  value: string;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
};

export default function Tabs({ items, value, onChange }: TabsProps) {
  return (
    <div className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-xl bg-[#E4EBF4] p-1">
      {items.map((item) => {
        const active = value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            aria-pressed={active}
            className={`shrink-0 rounded-lg px-3.5 py-2 text-sm transition ${
              active
                ? "border border-[#DCE5F0] bg-white font-medium text-[#10243A] shadow-sm"
                : "text-[#526B86] hover:bg-white/60"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
