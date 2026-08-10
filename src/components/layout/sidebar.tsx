"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { navigationItems } from "@/config/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/utils/cn";

export function Sidebar() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const visibleItems = navigationItems.filter(
    (item) => user?.role === "ADMIN" || ("employeeVisible" in item) || (!("adminOnly" in item) && Boolean(user?.permissions?.[item.permission])),
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[300px] overflow-hidden rounded-r-[28px] border-r border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:block">
      <div className="flex h-full">
        <div className="flex w-[72px] flex-col items-center justify-between bg-[#1f4ca3] py-6">
          <div className="space-y-5">
            <div className="flex justify-center">
              <BrandLogo compact className="h-11 w-11 rounded-xl border-white/10 bg-[#16397d]" imageClassName="p-0.5" priority />
            </div>

            <div className="flex flex-col items-center gap-3">
              {visibleItems.slice(0, 7).map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <div
                    key={`rail-${item.href}`}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl text-white/80 transition-all",
                      isActive ? "bg-[#4c83ff] text-white shadow-[0_10px_24px_rgba(76,131,255,0.45)]" : "hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-white">
            {(user?.name ?? "A").slice(0, 1).toUpperCase()}
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-white">
          <div className="border-b border-slate-200 px-5 py-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-xl font-semibold tracking-[-0.03em] text-slate-950">Central dos Planos</p>
                <p className="truncate text-xs uppercase tracking-[0.24em] text-[#2563eb]">CRM comercial</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[#2563eb]">
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2 px-3 py-4">
            {visibleItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              if ("comingSoon" in item && item.comingSoon) {
                return (
                  <div
                    key={item.href}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-slate-400"
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                      {item.title}
                    </span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                      Em breve
                    </span>
                  </div>
                );
              }

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
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">{user?.name ?? "Usuário"}</p>
                <p className="truncate text-xs text-[#2563eb]">{user?.role === "ADMIN" ? "Administrador" : "Operador"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
