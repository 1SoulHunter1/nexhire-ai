import { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function RecruiterLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      roleTitle="Recruiter"
      navItems={[
        { label: "Dashboard", href: "/recruiter/dashboard", icon: "home" },
        { label: "Open Roles", href: "/recruiter/roles", icon: "briefcase" },
        { label: "Candidates", href: "/recruiter/candidates", icon: "users" },
        { label: "Analytics", href: "/recruiter/analytics", icon: "bar-chart" },
      ]}
    >
      {children}
    </DashboardShell>
  );
}
