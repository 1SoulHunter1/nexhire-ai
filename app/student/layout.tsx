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
        { label: "Career Roadmap AI", href: "/student/roadmap", icon: "bar-chart" },
        { label: "AI Career Mentor", href: "/student/mentor", icon: "bot" },
        { label: "Resume Analysis", href: "/student/resume", icon: "clipboard" },
        { label: "Profile", href: "/student/profile", icon: "user-check" },
      ]}
    >
      {children}
    </DashboardShell>
  );
}
