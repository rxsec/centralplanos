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
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-100">E-mail</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-100/70" />
          <Input
            className="h-12 rounded-xl border-white/10 bg-white/95 pl-11 text-slate-950 shadow-[0_10px_30px_rgba(2,12,27,0.12)] placeholder:text-slate-400 focus-visible:ring-cyan-300"
            name="email"
            placeholder="usuario@centraldosplanos.com.br"
            required
            type="email"
          />
        </div>
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-100">Senha</span>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-100/70" />
          <Input
            className="h-12 rounded-xl border-white/10 bg-white/95 pl-11 pr-11 text-slate-950 shadow-[0_10px_30px_rgba(2,12,27,0.12)] placeholder:text-slate-400 focus-visible:ring-cyan-300"
            name="password"
            placeholder="Digite sua senha"
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
      {error ? <p className="rounded-xl border border-red-300/20 bg-red-500/15 p-3 text-sm text-red-100">{error}</p> : null}
      <Button className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-[15px] font-medium text-slate-950 shadow-[0_16px_35px_rgba(14,165,233,0.35)] transition hover:brightness-105" disabled={loading} type="submit">
        {loading ? "Entrando" : "Entrar"}
      </Button>
      <p className="text-center text-xs leading-5 text-slate-400">
        Ambiente protegido para a operação comercial da Central dos Planos.
      </p>
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
