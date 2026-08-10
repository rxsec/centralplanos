import { Suspense } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { LoginForm } from "@/modules/usuarios/components/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="flex min-h-screen flex-col bg-white">
          <div className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
            <div className="flex items-center gap-3">
              <BrandLogo compact className="h-11 w-11 rounded-xl border-slate-200 bg-[#04162b]" priority />
              <div>
                <p className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">Central dos Planos</p>
                <p className="text-sm text-slate-500">CRM comercial</p>
              </div>
            </div>

            <div className="hidden items-center gap-5 text-sm sm:flex">
              <a className="font-medium text-[#2563eb] transition hover:text-[#1d4ed8]" href="mailto:suporte@centraldosplanos.com">
                Precisa de ajuda?
              </a>
              <div className="h-5 w-px bg-slate-200" />
              <span className="text-slate-500">Português</span>
            </div>
          </div>

          <div className="flex flex-1 items-center px-6 pb-12 pt-4 sm:px-10 lg:px-14">
            <div className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-[600px]">
              <div className="max-w-lg">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#2563eb]">Sales workspace</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  Inicie sua sessão e entre na operação.
                </h1>
                <p className="mt-5 text-lg leading-8 text-slate-500">
                  Acesse a Central dos Planos para acompanhar leads, conversas, planos e toda a rotina comercial em um único painel.
                </p>
              </div>

              <div className="mt-12 max-w-[540px]">
                <Suspense fallback={<div className="h-72 rounded-3xl border border-slate-200 bg-slate-50" />}>
                  <LoginForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-[linear-gradient(180deg,#4383f4_0%,#2d6fe9_100%)] lg:flex lg:min-h-screen lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.24),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(20,74,182,0.25),_transparent_30%)]" />

          <div className="relative px-10 pb-12 pt-16 xl:px-14">
            <div className="mx-auto max-w-md text-center text-white">
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em]">
                Venda mais com uma operação que responde mais rápido.
              </h2>
              <p className="mt-6 text-lg leading-8 text-blue-50/90">
                Organize mensagens, ative a Marcia no momento certo e transforme atendimento em conversão com uma experiência comercial mais profissional.
              </p>
              <span className="mt-6 inline-flex text-base font-semibold text-white underline decoration-white/60 underline-offset-4">
                Visual inspirado em SaaS internacional
              </span>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-10 pb-16">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute right-2 top-[-18px] flex h-9 w-9 items-center justify-center rounded-full bg-[#2f5496] text-white/90 shadow-lg">
                ×
              </div>

              <div className="rounded-[28px] bg-white p-5 shadow-[0_25px_80px_rgba(18,44,110,0.28)]">
                <div className="rounded-[22px] border border-slate-100 bg-white p-4">
                  <p className="text-xs font-semibold text-slate-400">Conversa em destaque</p>
                  <div className="mt-4 rounded-[18px] bg-[#f8fbff] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb] text-sm font-semibold text-white">
                        M
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">Marcia • Consultora</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          Olá! Posso te ajudar a encontrar o melhor plano de internet para o seu endereço.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Cliente</p>
                      <p className="mt-2 text-sm text-slate-700">Quero um plano com instalação rápida para minha casa.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(18,44,110,0.22)]">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-400">Escreva uma resposta...</p>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200">☺</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200">+</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[-36px] right-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#031424] shadow-[0_16px_40px_rgba(3,20,36,0.35)]">
                <div className="text-sm font-semibold text-white">CP</div>
                <div className="absolute bottom-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                  1
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
