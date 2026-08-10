"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { navigationItems } from "@/config/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/utils/cn";

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const visibleItems = navigationItems.filter(
    (item) => user?.role === "ADMIN" || ("employeeVisible" in item) || (!("adminOnly" in item) && Boolean(user?.permissions?.[item.permission])),
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-[width] duration-300 md:block",
        collapsed ? "w-[72px] rounded-r-[24px]" : "w-[336px] rounded-r-[28px]",
      )}
    >
      <div className="flex h-full">
        <div className="flex w-[72px] flex-col items-center justify-between bg-[#1f4ca3] py-6">
          <div className="pt-2">
            <div className="flex flex-col items-center gap-3">
              {visibleItems.slice(0, 7).map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={`rail-${item.href}`}
                    href={item.href}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl text-white/80 transition-all",
                      isActive ? "bg-[#4c83ff] text-white shadow-[0_10px_24px_rgba(76,131,255,0.45)]" : "hover:bg-white/10 hover:text-white",
                    )}
                    title={item.title}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-white">
            {(user?.name ?? "A").slice(0, 1).toUpperCase()}
          </div>
        </div>

        {!collapsed ? (
          <div className="flex flex-1 flex-col bg-white">
            <div className="border-b border-slate-200 px-5 py-7">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[31px] font-semibold leading-none tracking-[-0.04em] text-slate-950">Central dos Planos</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.42em] text-[#2563eb]">CRM comercial</p>
                </div>
                <button
                  type="button"
                  onClick={onToggle}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[#2563eb] transition hover:bg-blue-50"
                  aria-label="Ocultar menu lateral"
                  title="Ocultar menu lateral"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="flex-1 space-y-2 px-3 py-4">
              {visibleItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#1f4ca3] text-white shadow-[0_14px_28px_rgba(31,76,163,0.24)]"
                        : "text-[#2563eb] hover:bg-blue-50 hover:text-[#1d4ed8]",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      {item.title}
                    </span>
                    <ChevronRight className={cn("h-4 w-4", isActive ? "text-white/80" : "text-blue-300")} />
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-slate-200 p-4">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f4ca3] text-sm font-semibold text-white">
                  {(user?.name ?? "A").slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-5 text-slate-950">{user?.name ?? "Usuário"}</p>
                  <p className="mt-0.5 text-xs text-[#2563eb]">{user?.role === "ADMIN" ? "Administrador" : "Operador"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {collapsed ? (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-[-12px] top-6 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#2563eb] shadow-[0_8px_24px_rgba(15,23,42,0.14)] transition hover:bg-blue-50"
          aria-label="Mostrar menu lateral"
          title="Mostrar menu lateral"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : null}
    </aside>
  );
}
