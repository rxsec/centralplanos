import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type MetricCardProps = {
  title: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  href?: string;
  tone?: "blue" | "emerald" | "violet" | "amber";
};

const tones = {
  blue: {
    card: "border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)]",
    icon: "bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.25)]",
    ring: "from-blue-500/14 via-cyan-400/10 to-transparent",
  },
  emerald: {
    card: "border-emerald-100 bg-[linear-gradient(180deg,#ffffff_0%,#ecfdf5_100%)]",
    icon: "bg-emerald-600 text-white shadow-[0_12px_24px_rgba(5,150,105,0.24)]",
    ring: "from-emerald-500/14 via-emerald-300/10 to-transparent",
  },
  violet: {
    card: "border-violet-100 bg-[linear-gradient(180deg,#ffffff_0%,#f5f3ff_100%)]",
    icon: "bg-violet-600 text-white shadow-[0_12px_24px_rgba(124,58,237,0.24)]",
    ring: "from-violet-500/14 via-fuchsia-300/10 to-transparent",
  },
  amber: {
    card: "border-amber-100 bg-[linear-gradient(180deg,#ffffff_0%,#fffbeb_100%)]",
    icon: "bg-amber-500 text-white shadow-[0_12px_24px_rgba(245,158,11,0.25)]",
    ring: "from-amber-500/14 via-yellow-300/10 to-transparent",
  },
} as const;

export function MetricCard({ title, value, helper, icon: Icon, href, tone = "blue" }: MetricCardProps) {
  const palette = tones[tone];
  const card = (
    <Card className={cn("group relative overflow-hidden rounded-[24px] border shadow-[0_20px_50px_-32px_rgba(15,23,42,0.25)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_56px_-30px_rgba(15,23,42,0.32)]", palette.card)}>
      <div className={cn("pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))]", palette.ring)} />
      <CardContent className="relative flex items-center justify-between p-6">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{value}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{helper}</p>
        </div>
        <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", palette.icon)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}
