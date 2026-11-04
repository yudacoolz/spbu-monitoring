import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Card from "../../components/ui/Card";
import SingleBarChart from "../../components/charts/SingleBarChart";
import Tabs from "../../components/ui/Tabs";

const hourlyRevenue = [
  { label: "00:00", value: 10 },
  { label: "01:00", value: 8 },
  { label: "02:00", value: 5 },
  { label: "03:00", value: 5 },
  { label: "04:00", value: 9 },
  { label: "05:00", value: 20 },
  { label: "06:00", value: 45 },
  { label: "07:00", value: 75 },
  { label: "08:00", value: 90 },
  { label: "09:00", value: 70 },
  { label: "10:00", value: 60 },
  { label: "11:00", value: 58 },
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

export default function PendapatanPage() {
  const [period, setPeriod] = useState("today");

  return (
    <DashboardLayout
      title="Pendapatan"
      section="Keuangan"
      subtitle="Pencatatan penjualan BBM per jam dan per produk, dihitung dari totalisator × harga per liter."
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

        <div className="rounded-lg border border-[#DCE5F0] bg-white px-4 py-2.5 text-sm">
          8 Okt 2026 · s.d. 14:00
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          {
            label: "Omzet penjualan",
            value: "Rp 152,7 jt",
            note: "Liter × harga per liter",
          },
          {
            label: "Laba kotor",
            value: "Rp 5.120.900",
            note: "Margin BBM Rp 4.945.900 + pendapatan lain Rp 175.000",
          },
          {
            label: "Liter terjual",
            value: "15.617 L",
            note: "4 jenis BBM",
          },
          {
            label: "Pendapatan lain",
            value: "+Rp 175.000",
            note: "Sewa kios, LPG, oli & lainnya",
          },
          {
            label: "Transaksi",
            value: "892",
            note: "Transaksi pada periode terpilih",
          },
        ].map((item) => (
          <Card key={item.label}>
            <div className="p-5">
              <p className="text-xs font-medium tracking-wide text-[#7890AA]">
                {item.label.toUpperCase()}
              </p>

              <p className="mt-4 border-l-2 border-[#10243A] pl-3 text-xl font-semibold">
                {item.value}
              </p>

              <p className="mt-4 border-l-2 border-[#DCE5F0] pl-3 text-xs leading-5 text-[#526B86]">
                {item.note}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mb-5">
        <SingleBarChart
          title="Omzet per jam"
          summary="Data s.d. 14:00"
          data={hourlyRevenue}
        />
      </div>

      <Card title="Per produk">
        <div className="space-y-5 p-5">
          {[
            {
              name: "Pertalite",
              amount: "Rp 98,1 jt",
              liters: "9.809 L × Rp 10.000",
              percentage: 64,
            },
            {
              name: "Pertamax",
              amount: "Rp 32,4 jt",
              liters: "2.592 L × Rp 12.500",
              percentage: 21,
            },
            {
              name: "Biosolar",
              amount: "Rp 16,1 jt",
              liters: "2.367 L × Rp 6.800",
              percentage: 11,
            },
            {
              name: "Pertamax Turbo",
              amount: "Rp 6,1 jt",
              liters: "436 L × Rp 13.900",
              percentage: 4,
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

              <div className="mt-1 flex justify-between gap-2 text-xs text-[#7890AA]">
                <span>{item.liters}</span>
                <span>{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
