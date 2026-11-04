import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
};

export default function Card({
  children,
  className = "",
  title,
  action,
}: CardProps) {
  return (
    <section
      className={`min-w-0 overflow-hidden rounded-xl border border-[#DCE5F0] bg-white ${className}`}
    >
      {(title || action) && (
        <div className="flex min-h-14 items-center justify-between gap-3 border-b border-[#E2EAF3] px-5 py-3">
          {title && (
            <h2 className="text-sm font-semibold text-[#10243A]">{title}</h2>
          )}
          {action}
        </div>
      )}

      <div>{children}</div>
    </section>
  );
}
