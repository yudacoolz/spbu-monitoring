import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Download } from "lucide-react";

type DashboardLayoutProps = {
  title: string;
  subtitle?: string;
  section?: string;
  children: ReactNode;
  onExport?: () => void;
};

export default function DashboardLayout({
  title,
  subtitle,
  section = "Operasional",
  children,
  onExport,
}: DashboardLayoutProps) {
  const [activeMenu, setActiveMenu] = useState("Beranda");

  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F7FC] text-[#10243A]">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header section={section} pageTitle={title} onExport={onExport} />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1800px] p-5 lg:p-8">
            <div className="mb-6 flex justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-[#10243A]">
                    {title}
                  </h1>
                </div>

                {subtitle && (
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526B86]">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Export Button */}
              <button
                onClick={onExport}
                className="flex items-center gap-2 rounded-xl border border-[#D5E0ED] bg-white px-3 py-2 text-sm font-medium text-[#10243A] hover:bg-[#F8FAFD]"
              >
                <Download size={17} />
                <span>Ekspor</span>
              </button>
            </div>

            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
