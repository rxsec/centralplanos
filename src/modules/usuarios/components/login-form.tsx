"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigationItems } from "@/config/navigation";
import type { ApiResult } from "@/types/api";

type LoginResult = {
  role?: "ADMIN" | "EMPLOYEE";
  permissions?: Record<string, boolean> | null;
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const result = (await response.json()) as ApiResult<LoginResult>;

    if (result.status === "success") {
      router.replace(searchParams.get("redirect") ?? getStartPath(result.data));
      router.refresh();
      return;
    }

    setError(result.message);
    setLoading(false);
  }

  return (
    <form className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] sm:p-8" onSubmit={handleSubmit}>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">Iniciar sessão</h2>
        <p className="mt-3 text-base leading-7 text-slate-500">
          Entre com seu e-mail e sua senha para acessar a sua central comercial.
        </p>
      </div>

      <div className="space-y-5">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Autentique-se com o seu endereço de e-mail</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-12 rounded-xl border-slate-200 bg-white pl-11 text-slate-950 placeholder:text-slate-400 focus-visible:ring-[#2563eb]"
            name="email"
            placeholder="Introduza o seu e-mail..."
            required
            type="email"
          />
        </div>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Palavra-passe</span>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            className="h-12 rounded-xl border-slate-200 bg-white pl-11 pr-11 text-slate-950 placeholder:text-slate-400 focus-visible:ring-[#2563eb]"
            name="password"
            placeholder="Introduza a sua palavra-passe..."
            required
            type={showPassword ? "text" : "password"}
          />
          <button
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
            onClick={() => setShowPassword((current) => !current)}
            type="button"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </label>
      {error ? <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <Button className="h-12 w-full rounded-xl bg-[#cfe0ff] text-[15px] font-medium text-white transition hover:bg-[#bcd3ff]" disabled={loading} type="submit">
        {loading ? "Entrando" : "Entrar"}
      </Button>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
        Ambiente protegido para a operação comercial da Central dos Planos.
      </div>
    </form>
  );
}

function getStartPath(user?: LoginResult) {
  if (user?.role === "ADMIN") {
    return "/dashboard";
  }

  const item = navigationItems.find((navigationItem) => {
    if ("adminOnly" in navigationItem && navigationItem.adminOnly) return false;
    if ("employeeVisible" in navigationItem && navigationItem.employeeVisible) return true;
    return Boolean(user?.permissions?.[navigationItem.permission]);
  });

  return item?.href ?? "/configuracoes";
}
