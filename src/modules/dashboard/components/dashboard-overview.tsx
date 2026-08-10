"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const statusLabels: Record<string, string> = {
  NEW: "Novo",
  CONTACTED: "Contato",
  QUALIFIED: "Qualificado",
  PROPOSAL: "Proposta",
  WON: "Fechado",
  LOST: "Perdido",
};

const statusOrder = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];
const chartColors = ["#0284c7", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#475569"];

export type DashboardOverviewData = {
  leadStatuses: Array<{ status: string; count: number }>;
  leadChart: Array<{ date: string; label: string; count: number }>;
  planSales: Array<{ planId: string | null; planName: string; count: number; totalValue: number }>;
  recentLeads: Array<{
    id: string;
    name: string;
    phone: string;
    status: string;
    city: string | null;
    state: string | null;
    planName: string | null;
    assignedUserName: string | null;
    expectedValue: number;
    createdAt: string;
  }>;
};

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function DashboardOverview({ data, loading }: { data: DashboardOverviewData | null; loading: boolean }) {
  const funnelData = statusOrder.map((status) => ({
    status,
    label: statusLabels[status],
    count: data?.leadStatuses.find((item) => item.status === status)?.count ?? 0,
  }));

  const statusData = funnelData.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  const chartData = data?.leadChart ?? [];
  const planData = data?.planSales ?? [];

  return (
    <div className="mt-5 space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden rounded-[28px] border-slate-200 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.32)]">
          <CardHeader className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
            <CardTitle className="text-[24px] tracking-[-0.03em]">Leads por Periodo</CardTitle>
            <CardDescription>Entrada de oportunidades ao longo da janela selecionada</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: -20, right: 12, top: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbeafe" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" />
                  <Tooltip
                    cursor={{ fill: "rgba(37,99,235,0.08)" }}
                    contentStyle={{ borderRadius: 16, borderColor: "#dbeafe", boxShadow: "0 18px 45px rgba(15,23,42,0.08)" }}
                  />
                  <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={entry.date} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-[28px] border-slate-200 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.32)]">
          <CardHeader className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
            <CardTitle className="text-[24px] tracking-[-0.03em]">Status do Kanban</CardTitle>
            <CardDescription>Distribuicao atual dos leads por etapa de vendas</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>
                    {statusData.map((entry, index) => (
                      <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 16, borderColor: "#dbeafe", boxShadow: "0 18px 45px rgba(15,23,42,0.08)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {funnelData.map((item, index) => (
                <div key={item.status} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: chartColors[index % chartColors.length] }}
                    />
                    {item.label}
                  </span>
                  <strong>{item.count}</strong>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden rounded-[28px] border-slate-200 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.32)]">
          <CardHeader className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
            <CardTitle className="text-[24px] tracking-[-0.03em]">Leads Recentes</CardTitle>
            <CardDescription>Ultimas oportunidades cadastradas na operacao</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="divide-y overflow-hidden rounded-[22px] border border-slate-200 bg-white">
              {loading ? (
                <p className="p-4 text-sm text-muted-foreground">Carregando</p>
              ) : data?.recentLeads.length ? (
                data.recentLeads.map((lead) => (
                  <div key={lead.id} className="grid gap-3 p-4 text-sm transition-colors hover:bg-slate-50 md:grid-cols-[1fr_160px_140px]">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-950">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>{lead.planName ?? "Sem plano"}</p>
                      <p>{lead.assignedUserName ?? "Sem responsavel"}</p>
                    </div>
                    <div className="text-xs text-muted-foreground md:text-right">
                      <p>{statusLabels[lead.status] ?? lead.status}</p>
                      <p>{currency.format(lead.expectedValue)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-muted-foreground">Sem leads cadastrados</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-[28px] border-slate-200 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.32)]">
          <CardHeader className="border-b border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
            <CardTitle className="text-[24px] tracking-[-0.03em]">Principais Planos Vendidos</CardTitle>
            <CardDescription>Quantidade e valor total por plano fechado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-6">
            {planData.length ? (
              planData.map((item, index) => (
                <div key={item.planId ?? item.planName} className="rounded-[20px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.planName}</span>
                    <span className="font-semibold text-slate-950">{currency.format(item.totalValue)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.count} venda(s)</p>
                  <div className="mt-3 h-2.5 rounded-full bg-slate-100">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(item.count * 12, 100)}%`,
                        backgroundColor: chartColors[index % chartColors.length],
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-[20px] border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-muted-foreground">
                Sem planos vendidos
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
