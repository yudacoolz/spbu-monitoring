import { Bell, ChevronRight, Download } from "lucide-react";

type HeaderProps = {
  section?: string;
  pageTitle: string;
  onExport?: () => void;
};

export default function Header({
  section = "Operasional",
  pageTitle,
  onExport,
}: HeaderProps) {
  return (
    <header className="flex min-h-[76px] items-center justify-between gap-4 border-b border-[#DCE5F0] bg-[#F3F7FC] px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-2 text-sm text-[#7890AA]">
        <span className="hidden sm:inline">{section}</span>
        <ChevronRight size={15} className="hidden sm:inline" />
        <span className="truncate font-semibold text-[#10243A]">
          {pageTitle}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button className="relative inline-flex items-center gap-2 rounded-xl border border-[#D5E0ED] bg-white px-3 py-2.5 text-sm text-[#10243A] hover:bg-[#F8FAFD]">
          <Bell size={17} />
          <span className="hidden sm:inline">Notifikasi</span>
          <span className="rounded-md bg-[#EF2026] px-1.5 py-0.5 text-[11px] font-bold text-white">
            4 peringatan
          </span>
        </button>

        {/* Export Button */}
        {/* <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5E0ED] bg-white px-3 py-2.5 text-sm font-medium text-[#10243A] hover:bg-[#F8FAFD]"
        >
          <Download size={17} />
          <span>Ekspor</span>
        </button> */}
      </div>
    </header>
  );
}
