import { useState } from "react";
import { Info, MoreHorizontal } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Card from "../../components/ui/Card";
import ProgressBar from "../../components/ui/ProgressBar";
import SingleBarChart from "../../components/charts/SingleBarChart";
import DoubleBarChart from "../../components/charts/DoubleBarChart";
import LineChart from "../../components/charts/LineChart";
import Tabs from "../../components/ui/Tabs";

const hourlySales = [
  { label: "00:00", value: 12 },
  { label: "01:00", value: 8 },
  { label: "02:00", value: 6 },
  { label: "03:00", value: 6 },
  { label: "04:00", value: 10 },
  { label: "05:00", value: 22 },
  { label: "06:00", value: 45 },
  { label: "07:00", value: 75 },
  { label: "08:00", value: 85 },
  { label: "09:00", value: 70 },
  { label: "10:00", value: 62 },
  { label: "11:00", value: 60 },
  { label: "12:00", value: 65 },
  { label: "13:00", value: 62 },
  { label: "14:00", value: 2 },
  { label: "15:00", value: 2 },
  { label: "16:00", value: 2 },
  { label: "17:00", value: 2 },
  { label: "18:00", value: 2 },
  { label: "19:00", value: 2 },
  { label: "20:00", value: 2 },
  { label: "21:00", value: 2 },
  { label: "22:00", value: 2 },
  { label: "23:00", value: 2 },
];

const monthlyProfit = [
  { label: "Mei", value: 80 },
  { label: "Jun", value: 70 },
  { label: "Jul", value: 68 },
  { label: "Agu", value: 85 },
  { label: "Sep", value: 79 },
  { label: "Okt*", value: 25 },
];

const monthlyComparison = [
  { label: "Mei", income: 100, cost: 65 },
  { label: "Jun", income: 95, cost: 65 },
  { label: "Jul", income: 98, cost: 70 },
  { label: "Agu", income: 105, cost: 65 },
  { label: "Sep", income: 100, cost: 65 },
  { label: "Okt*", income: 25, cost: 65 },
];

function MetricCard({
  label,
  value,
  note,
  segments,
}: {
  label: string;
  value: string;
  note: string;
  segments?: { value: number; color: string }[];
}) {
  return (
    <Card className="h-full">
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium tracking-wide text-[#7890AA]">
            {label.toUpperCase()}
          </span>
          <button aria-label={`Info ${label}`} className="text-[#7890AA]">
            <Info size={14} />
          </button>
        </div>

        <div className="mt-3 border-l-2 border-[#10243A] pl-3">
          <p className="text-2xl font-semibold tracking-tight text-[#10243A]">
            {value}
          </p>
        </div>

        {segments && <ProgressBar segments={segments} className="mt-4" />}

        <p className="mt-4 border-l-2 border-[#DCE5F0] pl-3 text-xs leading-5 text-[#526B86]">
          {note}
        </p>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const [period, setPeriod] = useState("today");

  function handleExport() {
    const content = [
      ["Metrik", "Nilai"],
      ["Omzet hari ini", "Rp 152,7 jt"],
      ["Laba kotor", "Rp 5.120.900"],
      ["Liter terjual", "15.617 L"],
      ["Transaksi", "892"],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([content], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dashboard-spbu.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout
      title="Beranda"
      section="SPBU Puri Beta"
      subtitle="Ringkasan operasional dan keuangan SPBU."
      onExport={handleExport}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={period}
          onChange={setPeriod}
          items={[
            { label: "Harian", value: "today" },
            { label: "7 hari", value: "7days" },
            { label: "2 minggu", value: "2weeks" },
            { label: "1 bulan", value: "month" },
          ]}
        />

        <div className="rounded-lg border border-[#DCE5F0] bg-white px-4 py-2.5 text-sm text-[#526B86]">
          8 Okt 2026 · s.d. 14:00
        </div>
      </div>

      <Card
        title="Operasional hari ini"
        action={
          <span className="text-xs text-[#7890AA]">
            Stok, dispenser & penerimaan
          </span>
        }
        className="mb-5"
      >
        <div className="grid grid-cols-1 divide-y divide-[#E2EAF3] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          <div className="p-5">
            <p className="text-xs text-[#7890AA]">TOTAL STOK</p>
            <p className="mt-3 text-2xl font-semibold">82.300 L</p>
            <ProgressBar
              className="mt-3"
              segments={[
                { value: 40, color: "#2D805E" },
                { value: 15, color: "#102B45" },
                { value: 10, color: "#3478BC" },
              ]}
            />
            <p className="mt-3 text-xs text-[#526B86]">
              dari 130.000 L · 4 tangki
            </p>
          </div>

          <div className="p-5">
            <p className="text-xs text-[#7890AA]">KELUAR DARI DISPENSER</p>
            <p className="mt-3 text-2xl font-semibold">+16.310 L</p>
            <p className="mt-3 text-xs text-[#526B86]">
              676 transaksi · Rp 159,3 jt
            </p>
          </div>

          <div className="p-5">
            <p className="text-xs text-[#7890AA]">KUOTA PERTALITE</p>
            <p className="mt-3 text-2xl font-semibold text-[#EF2026]">82%</p>
            <p className="mt-3 text-xs text-[#526B86]">
              Diproyeksi habis 9 Des 2026
            </p>
          </div>

          <div className="p-5">
            <p className="text-xs text-[#7890AA]">PENERIMAAN TERAKHIR</p>
            <p className="mt-3 text-2xl font-semibold">06 Okt</p>
            <p className="mt-3 text-xs text-[#526B86]">Pertalite · 15.982 L</p>
          </div>
        </div>
      </Card>

      <Card
        title="Keuangan hari ini"
        action={
          <span className="rounded-md bg-[#E4EBF4] px-2 py-1 text-xs text-[#46617D]">
            Biaya & laba bersih dihitung bulanan
          </span>
        }
        className="mb-5"
      >
        <div className="grid grid-cols-1 divide-y divide-[#E2EAF3] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {[
            {
              label: "OMZET HARI INI",
              value: "Rp 152,7 jt",
              note: "15.617 L · s.d. 14:00",
              color: "#3478BC",
            },
            {
              label: "LABA KOTOR HARI INI",
              value: "Rp 5.120.900",
              note: "3,4% dari omzet",
              color: "#2D805E",
            },
            {
              label: "OMZET BULAN INI",
              value: "Rp 2.473 jt",
              note: "1–8 Okt 2026",
              color: "#3478BC",
            },
            {
              label: "LABA KOTOR BULAN INI",
              value: "Rp 82,4 jt",
              note: "Laba bersih dihitung saat tutup buku",
              color: "#2D805E",
            },
          ].map((metric) => (
            <div key={metric.label} className="p-5">
              <p className="text-xs text-[#7890AA]">{metric.label}</p>
              <p
                className="mt-2 border-l-2 pl-3 text-xl font-semibold"
                style={{ borderColor: metric.color, color: metric.color }}
              >
                {metric.value}
              </p>
              <p className="mt-2 text-xs text-[#526B86]">{metric.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <LineChart
          title="Laba kotor harian · 30 hari"
          summary="Rata-rata Rp 10,9 jt/hari"
          data={[
            { label: "8 Sep", value: 10 },
            { label: "10 Sep", value: 11 },
            { label: "12 Sep", value: 12 },
            { label: "15 Sep", value: 9 },
            { label: "18 Sep", value: 10 },
            { label: "22 Sep", value: 12 },
            { label: "25 Sep", value: 8 },
            { label: "29 Sep", value: 11 },
            { label: "2 Okt", value: 12 },
            { label: "6 Okt", value: 13 },
            { label: "7 Okt", value: 10 },
          ]}
        />

        <DoubleBarChart title="Laba rugi per bulan" data={monthlyComparison} />
      </div>

      <div className="mb-5">
        <SingleBarChart
          title="Omzet per jam"
          summary="Data contoh"
          data={hourlySales}
        />
      </div>

      <Card title="Per produk" className="mb-5">
        <div className="space-y-5 p-5">
          {[
            {
              name: "Pertalite",
              amount: "Rp 98,1 jt",
              note: "9.809 L × Rp 10.000",
              percentage: 64,
            },
            {
              name: "Pertamax",
              amount: "Rp 32,4 jt",
              note: "2.592 L × Rp 12.500",
              percentage: 21,
            },
            {
              name: "Biosolar",
              amount: "Rp 16,1 jt",
              note: "2.367 L × Rp 6.800",
              percentage: 11,
            },
          ].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between gap-3 text-sm">
                <span>{item.name}</span>
                <strong>{item.amount}</strong>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E2EAF3]">
                <div
                  className="h-full rounded-full bg-[#3478BC]"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-[#7890AA]">
                <span>{item.note}</span>
                <span>{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Aktivitas terbaru" action={<MoreHorizontal size={18} />}>
        <div className="divide-y divide-[#E2EAF3]">
          {[
            ["14:00", "Shift 1", "Dewi", "Berjalan"],
            ["13:59", "Transaksi dispenser", "Agus", "Selesai"],
            ["13:44", "Transaksi dispenser", "Rizal", "Selesai"],
          ].map(([time, activity, operator, status]) => (
            <div
              key={`${time}-${activity}`}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm"
            >
              <span className="text-[#526B86]">{time}</span>
              <span className="flex-1 font-medium">{activity}</span>
              <span className="text-[#526B86]">{operator}</span>
              <span className="rounded-md bg-[#E1F2E9] px-2 py-1 text-xs text-[#2D805E]">
                {status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
