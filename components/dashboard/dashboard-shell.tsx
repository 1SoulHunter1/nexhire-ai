"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  FiBell,
  FiClipboard,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiBriefcase,
  FiBarChart2,
} from "react-icons/fi";

import { cn } from "@/lib/utils";

type NavIconKey =
  | "home"
  | "briefcase"
  | "bar-chart"
  | "user-check"
  | "users"
  | "clipboard";

const navIconMap = {
  home: FiHome,
  briefcase: FiBriefcase,
  "bar-chart": FiBarChart2,
  "user-check": FiUserCheck,
  users: FiUsers,
  clipboard: FiClipboard,
} as const;

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: NavIconKey;
};

type DashboardShellProps = {
  roleTitle: string;
  navItems: DashboardNavItem[];
  children: ReactNode;
};

export function DashboardShell({ roleTitle, navItems, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,hsl(var(--primary)/0.2),transparent_35%),radial-gradient(circle_at_90%_0%,hsl(var(--secondary)/0.18),transparent_30%)]" />

      <div className="relative flex min-h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border/70 bg-card/90 backdrop-blur-md transition-all duration-300 md:static md:translate-x-0",
            isCollapsed ? "w-[88px]" : "w-72",
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b border-border/70 px-4">
            <div className={cn("flex items-center gap-2", isCollapsed && "justify-center")}> 
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
              {!isCollapsed ? (
                <div>
                  <p className="text-sm font-semibold">NexHire AI</p>
                  <p className="text-xs text-muted-foreground">{roleTitle}</p>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="hidden rounded-md border border-border/80 p-1.5 text-muted-foreground transition hover:text-foreground md:inline-flex"
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? <FiChevronRight className="size-4" /> : <FiChevronLeft className="size-4" />}
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = navIconMap[item.icon];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md border px-3 py-2 text-sm transition",
                    isCollapsed && "justify-center px-2",
                    isActive
                      ? "border-primary/50 bg-primary/20 text-primary"
                      : "border-transparent text-muted-foreground hover:border-border/80 hover:bg-accent/40 hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!isCollapsed ? <span>{item.label}</span> : null}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border/70 p-3">
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm text-muted-foreground transition hover:border-border/80 hover:bg-accent/40 hover:text-foreground",
                isCollapsed && "justify-center px-2"
              )}
            >
              <FiLogOut className="size-4 shrink-0" />
              {!isCollapsed ? <span>Sign out</span> : null}
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-md">
            <div className="app-container flex h-16 items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
                  className="inline-flex rounded-md border border-border/80 p-2 text-muted-foreground transition hover:text-foreground md:hidden"
                  aria-label="Open sidebar"
                >
                  <FiMenu className="size-4" />
                </button>
                <h1 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {roleTitle}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="relative inline-flex rounded-md border border-border/80 p-2 text-muted-foreground transition hover:text-foreground"
                  aria-label="Notifications"
                >
                  <FiBell className="size-4" />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-secondary" />
                </button>

                <details className="relative">
                  <summary className="flex cursor-pointer list-none items-center gap-2 rounded-md border border-border/80 bg-card/70 px-3 py-2 text-sm text-foreground transition hover:bg-card">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <FiUser className="size-4" />
                    </span>
                    <span className="hidden sm:inline">Alex Morgan</span>
                    <FiChevronDown className="size-4 text-muted-foreground" />
                  </summary>
                  <div className="absolute right-0 mt-2 w-48 rounded-md border border-border/80 bg-card p-2 shadow-card">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
                    >
                      <FiUser className="size-4" />
                      Profile
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
                    >
                      <FiSettings className="size-4" />
                      Settings
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
                    >
                      <FiLogOut className="size-4" />
                      Sign out
                    </button>
                  </div>
                </details>
              </div>
            </div>
          </header>

          <main className="app-container flex-1 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
