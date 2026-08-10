"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { CurrentUserProvider } from "@/hooks/use-current-user";
import { cn } from "@/utils/cn";

type AppShellProps = {
  title: string;
  children: React.ReactNode;
};

const SIDEBAR_EXPANDED_WIDTH = 336;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export function AppShell({ title, children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const storedValue = window.localStorage.getItem("central-dos-planos:sidebar-collapsed");
    setIsSidebarCollapsed(storedValue === "true");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("central-dos-planos:sidebar-collapsed", String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  return (
    <CurrentUserProvider>
      <div className="min-h-screen bg-[#f6f9ff]">
        <Sidebar
          collapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((current) => !current)}
        />
        <div className={cn(
          "min-h-screen",
          isSidebarCollapsed ? "md:pl-[72px]" : "md:pl-[336px]",
        )}>
          <Header title={title} />
          <main className="mx-auto w-full max-w-7xl px-4 py-5 pb-24 sm:px-6 md:pb-5 lg:px-8">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </CurrentUserProvider>
  );
}
