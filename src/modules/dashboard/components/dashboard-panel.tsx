"use client";

import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardMetrics } from "@/modules/dashboard/components/dashboard-metrics";
import type { DashboardMetricsData } from "@/modules/dashboard/components/dashboard-metrics";
import { DashboardOverview } from "@/modules/dashboard/components/dashboard-overview";
import type { DashboardOverviewData } from "@/modules/dashboard/components/dashboard-overview";
import { useApiResource } from "@/hooks/use-api-resource";

type DashboardData = DashboardMetricsData & DashboardOverviewData;

export function DashboardPanel() {
  const [period, setPeriod] = useState("7");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [appliedPeriod, setAppliedPeriod] = useState("7");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [refreshKey, setRefreshKey] = useState(() => Date.now());

  useEffect(() => {
    const refresh = () => setRefreshKey(Date.now());
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, 30_000);
    window.addEventListener("focus", refresh);
    window.addEventListener("crm:dashboard-refresh", refresh);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("crm:dashboard-refresh", refresh);
    };
  }, []);

  const dashboardUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("refresh", String(refreshKey));
    if (appliedPeriod !== "custom") {
      params.set("period", appliedPeriod);
    }
    if (appliedPeriod === "custom" && appliedFrom) params.set("from", appliedFrom);
    if (appliedPeriod === "custom" && appliedTo) params.set("to", appliedTo);
    const query = params.toString();
    return query ? `/api/dashboard?${query}` : "/api/dashboard";
  }, [appliedPeriod, appliedFrom, appliedTo, refreshKey]);

  const customPeriod = period === "custom";
  const dashboard = useApiResource<DashboardData>(dashboardUrl);
  const summaryPeriodLabel = appliedPeriod === "custom"
    ? [appliedFrom, appliedTo].filter(Boolean).join(" ate ") || "Periodo personalizado"
    : ({
        "7": "Ultimos 7 dias",
        "30": "Ultimos 30 dias",
        "90": "Ultimos 90 dias",
        "180": "Ultimos 6 meses",
        "365": "Ultimo ano",
      }[appliedPeriod] ?? "Periodo atual");

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-[30px] border border-sky-100 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_36%),linear-gradient(135deg,_#ffffff,_#eff6ff_52%,_#ecfeff)] p-5 shadow-[0_24px_80px_-44px_rgba(2,132,199,0.45)] lg:p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Painel executivo
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                Visao comercial da operacao em tempo real
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Acompanhe leads, conversoes, receita e despesas com uma leitura mais clara da performance da Central dos Planos.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Janela ativa</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{summaryPeriodLabel}</p>
              <p className="text-sm text-slate-500">Atualizacao automatica a cada 30 segundos</p>
            </div>
          </div>

          <div className="rounded-[26px] border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur md:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="space-y-1.5 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Periodo do grafico</span>
                  <select
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm"
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                  >
                    <option value="7">Ultimos 7 dias</option>
                    <option value="30">Ultimos 30 dias</option>
                    <option value="90">Ultimos 90 dias</option>
                    <option value="180">6 meses</option>
                    <option value="365">1 ano</option>
                    <option value="custom">Personalizado</option>
                  </select>
                </label>
                <label className="space-y-1.5 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Data inicial</span>
                  <Input
                    className="h-11 rounded-xl border-slate-200 bg-white shadow-sm"
                    disabled={!customPeriod}
                    type="date"
                    value={from}
                    onChange={(event) => setFrom(event.target.value)}
                  />
                </label>
                <label className="space-y-1.5 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Data final</span>
                  <Input
                    className="h-11 rounded-xl border-slate-200 bg-white shadow-sm"
                    disabled={!customPeriod}
                    type="date"
                    value={to}
                    onChange={(event) => setTo(event.target.value)}
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  className="h-11 rounded-xl bg-[#1f4ca3] px-5 text-white shadow-[0_14px_30px_rgba(31,76,163,0.24)] hover:bg-[#1b438f]"
                  onClick={() => {
                    setAppliedPeriod(period);
                    setAppliedFrom(period === "custom" ? from : "");
                    setAppliedTo(period === "custom" ? to : "");
                  }}
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Atualizar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl border-slate-200 bg-white px-5"
                  onClick={() => {
                    setFrom("");
                    setTo("");
                    setPeriod("7");
                    setAppliedPeriod("7");
                    setAppliedFrom("");
                    setAppliedTo("");
                  }}
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Limpar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DashboardMetrics data={dashboard.data} loading={dashboard.loading} />
      <DashboardOverview data={dashboard.data} loading={dashboard.loading} />
    </div>
  );
}
