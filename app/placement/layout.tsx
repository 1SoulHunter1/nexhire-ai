import { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function PlacementLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      roleTitle="Placement Officer"
      navItems={[
        { label: "Dashboard", href: "/placement/dashboard", icon: "home" },
        { label: "Students", href: "/placement/students", icon: "users" },
        { label: "Drive Mgmt", href: "/placement/drives", icon: "clipboard" },
        { label: "Reports", href: "/placement/reports", icon: "bar-chart" },
      ]}
    >
      {children}
    </DashboardShell>
  );
}
