import { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell
      roleTitle="Student"
      navItems={[
        { label: "Dashboard", href: "/student/dashboard", icon: "home" },
        { label: "Job Matches", href: "/student/jobs", icon: "briefcase" },
        { label: "Readiness", href: "/student/readiness", icon: "bar-chart" },
        { label: "Profile", href: "/student/profile", icon: "user-check" },
      ]}
    >
      {children}
    </DashboardShell>
  );
}
