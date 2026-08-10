import { Suspense } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { LoginForm } from "@/modules/usuarios/components/login-form";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061a31] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(19,174,255,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,98,182,0.28),_transparent_28%),linear-gradient(135deg,_#071a32_0%,_#08213d_40%,_#04111f_100%)]" />
      <div className="absolute left-[-12%] top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-[-8%] h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_120px_rgba(3,10,24,0.45)] backdrop-blur md:p-10 lg:flex lg:min-h-[720px] lg:flex-col lg:justify-between">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-50/90">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.95)]" />
                Revenue workspace for internet sales teams
              </div>

              <div className="max-w-2xl space-y-5">
                <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-5xl">
                  O CRM da Central dos Planos com presença de produto global.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-300">
                  Organize conversas, acelere vendas e acompanhe sua operação em um workspace pensado para times comerciais que vendem com velocidade.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard value="24/7" label="Atendimento ativo" />
                <MetricCard value="IA + CRM" label="Fluxo comercial integrado" />
                <MetricCard value="Tempo real" label="Operação conectada" />
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[24px] border border-white/10 bg-[#071f3d]/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Pipeline overview</p>
                    <p className="text-2xl font-semibold text-white">Ritmo comercial forte</p>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    +18.4% este mês
                  </div>
                </div>

                <div className="space-y-4">
                  <ProgressRow label="Leads qualificados" value="78%" width="w-[78%]" />
                  <ProgressRow label="Conversões em andamento" value="64%" width="w-[64%]" />
                  <ProgressRow label="Retenção operacional" value="91%" width="w-[91%]" />
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-sm text-slate-300">Experience layer</p>
                <div className="mt-4 space-y-4">
                  <FeaturePill>Inbox com controle humano e chatbot</FeaturePill>
                  <FeaturePill>Gestão de leads, CEPs e planos</FeaturePill>
                  <FeaturePill>Operação desenhada para alta conversão</FeaturePill>
                </div>
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
              <div className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl" />

              <div className="relative">
                <div className="mb-8 text-center">
                  <BrandLogo className="mx-auto mb-5 shadow-[0_12px_40px_rgba(7,170,255,0.18)]" priority />
                  <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100">
                    Sales workspace
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white">Central dos Planos</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Entre na sua operação comercial com uma experiência mais premium, rápida e confiável.
                  </p>
                </div>

                <Suspense fallback={<div className="h-64 rounded-2xl bg-white/5" />}>
                  <LoginForm />
                </Suspense>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <p className="text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-300">{label}</p>
    </div>
  );
}

function ProgressRow({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-medium text-cyan-100">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div className={`h-2 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 ${width}`} />
      </div>
    </div>
  );
}

function FeaturePill({ children }: { children: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#081e39] px-4 py-3 text-sm text-slate-200">
      {children}
    </div>
  );
}
