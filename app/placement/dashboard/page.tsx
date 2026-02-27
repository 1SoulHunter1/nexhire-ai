"use client";

import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FiAlertTriangle, FiCheckCircle, FiFileText, FiShield, FiUsers } from "react-icons/fi";

import { placementAnalyticsData } from "@/lib/mock-data";

const monthlyRateData = placementAnalyticsData.monthlyPlacements.map((entry) => ({
  month: entry.month,
  rate: Number(((entry.placed / placementAnalyticsData.totalEligibleStudents) * 100).toFixed(1)),
  offers: entry.offers,
  placed: entry.placed,
}));

const approvalsData = [
  {
    id: "APP-2104",
    student: "Aarav Kulkarni",
    company: "QuantEdge Labs",
    packageLPA: "10.2",
    compliance: "Policy Verified",
    status: "Approved",
  },
  {
    id: "APP-2105",
    student: "Diya Menon",
    company: "BlueOrbit AI",
    packageLPA: "8.8",
    compliance: "Pending Documents",
    status: "Under Review",
  },
  {
    id: "APP-2106",
    student: "Rohan Shetty",
    company: "Helio Fintech",
    packageLPA: "7.1",
    compliance: "Policy Exception",
    status: "Escalated",
  },
  {
    id: "APP-2107",
    student: "Neha Bhat",
    company: "NimbleStack",
    packageLPA: "6.0",
    compliance: "Policy Verified",
    status: "Approved",
  },
];

const eligibilityRules = [
  {
    name: "Minimum CGPA",
    rule: "7.0 and above",
    compliance: "97% pass",
    risk: "Low",
  },
  {
    name: "No active backlogs",
    rule: "0 unresolved backlogs",
    compliance: "91% pass",
    risk: "Medium",
  },
  {
    name: "Attendance threshold",
    rule: "75% minimum",
    compliance: "88% pass",
    risk: "Medium",
  },
  {
    name: "Offer policy lock",
    rule: "1 dream + 1 super dream",
    compliance: "100% enforced",
    risk: "Low",
  },
];

const reports = [
  { title: "Placement Compliance Report", generatedOn: "27 Feb 2026", scope: "All departments" },
  { title: "Offer Governance Summary", generatedOn: "26 Feb 2026", scope: "Final-year students" },
  { title: "Eligibility Exceptions Log", generatedOn: "25 Feb 2026", scope: "Escalated cases" },
];

export default function PlacementDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="card-surface-soft border-border/80 bg-card/80">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Governance Console</p>
            <h1 className="mt-1 text-2xl font-semibold">Placement Officer Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor compliance, approvals, and placement progression with auditable insights.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-sm text-secondary">
            <FiShield className="size-4" />
            Governance Mode Active
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Eligible Students</p>
          <p className="mt-2 text-2xl font-semibold">{placementAnalyticsData.totalEligibleStudents}</p>
          <p className="mt-1 text-xs text-muted-foreground">Governed cohort for {placementAnalyticsData.academicYear}</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Students Placed</p>
          <p className="mt-2 text-2xl font-semibold">{placementAnalyticsData.studentsPlaced}</p>
          <p className="mt-1 text-xs text-muted-foreground">Current placement cycle completions</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Placement Rate</p>
          <p className="mt-2 text-2xl font-semibold">{placementAnalyticsData.placementRate}%</p>
          <p className="mt-1 text-xs text-muted-foreground">Institution-wide governance metric</p>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Student Analytics
            </h2>
            <span className="text-xs text-muted-foreground">Offers vs placements by month</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementAnalyticsData.monthlyPlacements}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.45} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="offers" fill="hsl(var(--secondary))" radius={[6, 6, 0, 0]} />
                <Bar dataKey="placed" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Placement Rate Graph
            </h2>
            <span className="text-xs text-secondary">Trend monitored</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.45} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(var(--primary))" }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.18}
                  stroke="transparent"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Eligibility Rules
            </h2>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <FiAlertTriangle className="size-3.5" />
              Policy enforcement
            </span>
          </div>

          <div className="space-y-3">
            {eligibilityRules.map((rule) => (
              <div key={rule.name} className="rounded-md border border-border/80 bg-background/45 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{rule.name}</p>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs ${
                      rule.risk === "Low"
                        ? "border-secondary/35 bg-secondary/10 text-secondary"
                        : "border-primary/35 bg-primary/10 text-primary"
                    }`}
                  >
                    {rule.risk} risk
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Rule: {rule.rule}</p>
                <p className="mt-1 text-xs text-muted-foreground">Compliance: {rule.compliance}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">Approvals Table</h2>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <FiUsers className="size-3.5" />
              Approval workflow
            </span>
          </div>

          <div className="overflow-x-auto rounded-md border border-border/80">
            <table className="w-full min-w-[680px] divide-y divide-border/80 text-sm">
              <thead className="bg-background/55">
                <tr className="text-left text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  <th className="px-3 py-2">Approval ID</th>
                  <th className="px-3 py-2">Student</th>
                  <th className="px-3 py-2">Company</th>
                  <th className="px-3 py-2">CTC (LPA)</th>
                  <th className="px-3 py-2">Compliance</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 bg-card/40">
                {approvalsData.map((row) => (
                  <tr key={row.id} className="hover:bg-accent/20">
                    <td className="px-3 py-3 font-medium">{row.id}</td>
                    <td className="px-3 py-3">{row.student}</td>
                    <td className="px-3 py-3">{row.company}</td>
                    <td className="px-3 py-3">₹{row.packageLPA}</td>
                    <td className="px-3 py-3 text-muted-foreground">{row.compliance}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs ${
                          row.status === "Approved"
                            ? "border-secondary/35 bg-secondary/10 text-secondary"
                            : row.status === "Under Review"
                            ? "border-primary/35 bg-primary/10 text-primary"
                            : "border-destructive/35 bg-destructive/10 text-destructive"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <section className="card-surface-soft border-border/80 bg-card/80">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">Reports Section</h2>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <FiFileText className="size-3.5" />
            Governance documentation
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {reports.map((report) => (
            <article key={report.title} className="rounded-md border border-border/80 bg-background/45 p-4">
              <p className="font-medium">{report.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">Generated on: {report.generatedOn}</p>
              <p className="mt-1 text-xs text-muted-foreground">Scope: {report.scope}</p>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-xs text-secondary"
              >
                <FiCheckCircle className="size-3.5" />
                View Report
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
