"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  FiBell,
  FiClipboard,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiLogOut,
  FiMenu,
  FiX,
  FiSettings,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiBriefcase,
  FiBarChart2,
  FiCpu,
} from "react-icons/fi";

import { cn } from "@/lib/utils";

type NavIconKey =
  | "home"
  | "briefcase"
  | "bar-chart"
  | "user-check"
  | "users"
  | "clipboard"
  | "bot";

const navIconMap = {
  home: FiHome,
  briefcase: FiBriefcase,
  "bar-chart": FiBarChart2,
  "user-check": FiUserCheck,
  users: FiUsers,
  clipboard: FiClipboard,
  bot: FiCpu,
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
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  const isMobileSidebarVisible = !isDesktop && isMobileSidebarOpen;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(event.matches);
      if (event.matches) {
        setIsMobileSidebarOpen(false);
      }
    };

    handleMediaQueryChange(mediaQuery);

    const handleChange = (event: MediaQueryListEvent) => {
      handleMediaQueryChange(event);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    navItems.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [navItems, router]);

  useEffect(() => {
    if (!isDesktop) {
      setIsMobileSidebarOpen(false);
    }
  }, [pathname, isDesktop]);

  useEffect(() => {
    if (!isMobileSidebarVisible) {
      return;
    }

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const sidebarElement = sidebarRef.current;

    if (!sidebarElement) {
      return;
    }

    const focusableElements = sidebarElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || activeElement === sidebarElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isMobileSidebarVisible]);

  useEffect(() => {
    if (!isMobileSidebarVisible) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!sidebarRef.current) {
        return;
      }

      const target = event.target as Node;
      if (!sidebarRef.current.contains(target)) {
        setIsMobileSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMobileSidebarVisible]);

  useEffect(() => {
    if (!isMobileSidebarVisible) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileSidebarVisible]);

  const handleSignOut = () => {
    const activeRole = pathname.split("/")[1] || "student";
    window.localStorage.removeItem("nexhire:auth:session");
    router.push(`/login?role=${activeRole}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,hsl(var(--primary)/0.2),transparent_35%),radial-gradient(circle_at_90%_0%,hsl(var(--secondary)/0.18),transparent_30%)]" />

      <div className="relative flex min-h-screen">
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen(false)}
          className={cn(
            "fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 md:hidden",
            isMobileSidebarVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-label="Close sidebar overlay"
          aria-hidden="true"
        />

        <aside
          ref={sidebarRef}
          id="dashboard-sidebar"
          role={isDesktop ? "complementary" : "dialog"}
          aria-modal={isMobileSidebarVisible ? true : undefined}
          aria-label={`${roleTitle} navigation`}
          tabIndex={isMobileSidebarVisible ? -1 : undefined}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/70 bg-card/90 backdrop-blur-md transition-all duration-300 ease-in-out md:static md:z-auto md:translate-x-0",
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

          <nav className="flex-1 space-y-1 p-3" aria-label={`${roleTitle} sidebar menu`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = navIconMap[item.icon];

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    if (!isDesktop) {
                      setIsMobileSidebarOpen(false);
                    }
                  }}
                  onMouseEnter={() => router.prefetch(item.href)}
                  onFocus={() => router.prefetch(item.href)}
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
              onClick={handleSignOut}
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
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/80 text-muted-foreground transition-colors duration-200 hover:text-foreground md:hidden"
                  aria-label={isMobileSidebarVisible ? "Close sidebar" : "Open sidebar"}
                  aria-expanded={isMobileSidebarVisible}
                  aria-controls="dashboard-sidebar"
                >
                  <FiMenu
                    className={cn(
                      "absolute size-4 transition-all duration-200",
                      isMobileSidebarVisible ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                    )}
                  />
                  <FiX
                    className={cn(
                      "absolute size-4 transition-all duration-200",
                      isMobileSidebarVisible ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
                    )}
                  />
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
                      onClick={handleSignOut}
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
