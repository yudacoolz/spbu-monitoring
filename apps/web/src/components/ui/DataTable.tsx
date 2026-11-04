import type { ReactNode } from "react";
import Card from "./Card";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  title: string;
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string;
};

export default function DataTable<T>({
  title,
  data,
  columns,
  rowKey,
}: DataTableProps<T>) {
  return (
    <Card title={title}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-[#F3F7FC] text-xs text-[#526B86]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`border-b border-[#DCE5F0] px-4 py-3 font-medium ${column.className ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={rowKey(row)} className="transition hover:bg-[#F8FAFD]">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`border-b border-[#E2EAF3] px-4 py-3.5 text-[#10243A] last:border-b-0 ${column.className ?? ""}`}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-[#7890AA]"
                >
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
