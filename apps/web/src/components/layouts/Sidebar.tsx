import { NavLink } from "react-router-dom";
import {
  Bell,
  House,
  DollarSign,
  ChartNoAxesColumn,
  Scale,
  Wrench,
  Building2,
  Truck,
  Database,
  Gauge,
} from "lucide-react";

const menuGroups = [
  {
    title: "ACCOUNTING PRACTICE",
    items: [
      { label: "Pendapatan", path: "/pendapatan", icon: DollarSign },
      { label: "Laba rugi", path: "/laba-rugi", icon: ChartNoAxesColumn },
      { label: "Neraca", path: "/neraca", icon: Scale },
    ],
  },
  {
    title: "OVERHEAD COST",
    items: [
      { label: "Biaya operasional", path: "/biaya-operasional", icon: Wrench },
      { label: "Biaya overhead", path: "/biaya-overhead", icon: Building2 },
    ],
  },
  {
    title: "OPERASIONAL",
    items: [
      { label: "Kuota subsidi", path: "/kuota-subsidi", icon: Gauge },
      { label: "Penerimaan", path: "/penerimaan", icon: Truck },
      {
        label: "Tangki & dispenser",
        path: "/tangki-dispenser",
        icon: Database,
      },
      { label: "Perawatan aset", path: "/perawatan-aset", icon: Wrench },
    ],
  },
  {
    title: "MASTER DATA",
    items: [
      {
        label: "Operational Cost",
        path: "/master-data/biaya-operasional",
        icon: Gauge,
      },
      {
        label: "Overhead Cost",
        path: "/master-data/biaya-overhead",
        icon: Truck,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col bg-[#0E2237] text-white">
      <div className="flex h-[84px] items-center gap-3 px-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EF2026]">
          <Gauge size={24} />
        </div>

        <div>
          <p className="font-semibold">SPBU Puri Beta</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <NavLink
          to="/notifikasi"
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
              isActive
                ? "bg-[#EF2026] font-semibold"
                : "text-[#C5D2E0] hover:bg-white/5"
            }`
          }
        >
          <Bell size={19} />
          Notifikasi
        </NavLink>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-sm ${
              isActive
                ? "bg-[#EF2026] font-semibold text-white"
                : "text-[#C5D2E0] hover:bg-white/5"
            }`
          }
        >
          <House size={19} />
          Beranda
        </NavLink>

        {menuGroups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="mb-2 px-3 pt-3 text-xs tracking-wide text-[#7890AA]">
              {group.title}
            </p>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      isActive
                        ? "bg-[#EF2026] font-semibold text-white"
                        : "text-[#C5D2E0] hover:bg-white/5"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-5">
        <p className="text-sm font-semibold">Lina Marlina</p>
        <p className="text-xs text-[#9CB0C7]">Pengelola · Shift 1</p>
      </div>
    </aside>
  );
}
