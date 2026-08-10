import { Suspense } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { LoginForm } from "@/modules/usuarios/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_24%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <BrandLogo className="mx-auto mb-5 rounded-2xl border-slate-200 bg-[#04162b] shadow-[0_18px_40px_rgba(15,23,42,0.12)]" priority />
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">Central dos Planos</h1>
          <p className="mt-2 text-sm text-slate-500">CRM comercial</p>
        </div>

        <Suspense fallback={<div className="h-72 rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)]" />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
