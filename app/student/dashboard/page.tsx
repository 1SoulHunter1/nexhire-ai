"use client";

import { motion } from "framer-motion";
import {
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import {
  FiBell,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCpu,
  FiMapPin,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

import {
  careerReadinessScoreData,
  jobsListData,
  skillsListData,
  studentProfileData,
} from "@/lib/mock-data";

const readinessChartData = [
  {
    name: "Readiness",
    value: careerReadinessScoreData.overallScore,
    fill: "hsl(var(--primary))",
  },
];

const skillGapData = skillsListData.filter(
  (skill) => skill.marketDemand === "High" && skill.proficiency !== "Advanced"
);

const activityTimeline = [
  {
    title: "Aptitude mock test completed",
    meta: "Scored 82% • 2 hours ago",
    icon: FiCheckCircle,
  },
  {
    title: "Profile viewed by BlueOrbit AI recruiter",
    meta: "Today, 11:24 AM",
    icon: FiBriefcase,
  },
  {
    title: "Interview prep session unlocked",
    meta: "Communication module • Yesterday",
    icon: FiCpu,
  },
  {
    title: "New role matched above 90%",
    meta: "Junior Frontend Engineer • Yesterday",
    icon: FiTrendingUp,
  },
];

const notifications = [
  "3 recruiters shortlisted your profile this week.",
  "Your React skill badge is now verified.",
  "Campus drive applications close in 2 days.",
];

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="card-surface relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,hsl(var(--primary)/0.22),transparent_35%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary)/0.2),transparent_30%)]" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Student Command Center
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Welcome, {studentProfileData.fullName}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <FiMapPin className="size-4" />
              {studentProfileData.university} • {studentProfileData.location}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-sm text-secondary">
            <FiZap className="size-4" />
            AI Match Engine Active
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          className="card-surface xl:col-span-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Career Readiness
            </h3>
            <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary">
              {careerReadinessScoreData.tier}
            </span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="66%"
                outerRadius="100%"
                barSize={14}
                data={readinessChartData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  dataKey="value"
                  cornerRadius={999}
                  background={{ fill: "hsl(var(--muted))" }}
                />
                <text
                  x="50%"
                  y="46%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-3xl font-semibold"
                >
                  {careerReadinessScoreData.overallScore}
                </text>
                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-xs"
                >
                  out of 100
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated {careerReadinessScoreData.lastUpdated}. Keep consistency in interview prep to cross 90.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="card-surface xl:col-span-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Recommended Jobs
            </h3>
            <span className="text-xs text-muted-foreground">Top matches</span>
          </div>

          <div className="space-y-3">
            {jobsListData.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="rounded-lg border border-border/80 bg-card/60 p-3 transition hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.company} • {job.location} • {job.workMode}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/15 px-2 py-1 text-xs text-primary">
                    {job.matchScore}%
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.matchedSkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-secondary/35 bg-secondary/10 px-2 py-0.5 text-xs text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="card-surface xl:col-span-3"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Skill Gap
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Priority skills to improve for higher-paying roles.
          </p>
          <div className="mt-4 space-y-2">
            {skillGapData.map((skill) => (
              <div key={skill.name} className="rounded-md border border-border/80 bg-card/60 p-2.5">
                <p className="text-sm font-medium">{skill.name}</p>
                <p className="text-xs text-muted-foreground">
                  {skill.proficiency} now • {skill.marketDemand} demand
                </p>
              </div>
            ))}
          </div>
        </motion.article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="card-surface xl:col-span-4"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Activity Timeline
          </h3>
          <div className="mt-4 space-y-4">
            {activityTimeline.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div key={activity.title} className="relative flex gap-3">
                  <div className="relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
                    <Icon className="size-3.5" />
                    {index < activityTimeline.length - 1 ? (
                      <span className="absolute top-8 h-8 w-px bg-border" />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.meta}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className="card-surface xl:col-span-4"
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            AI Insights
          </h3>
          <div className="mt-4 rounded-lg border border-primary/35 bg-primary/10 p-4">
            <p className="text-sm leading-relaxed text-foreground/90">
              Your profile has a <span className="font-semibold text-primary">high conversion potential</span> for
              frontend and analytics roles. Completing one advanced SQL project can increase your shortlisted rate by
              an estimated <span className="font-semibold text-secondary">14%</span>.
            </p>
          </div>
          <div className="mt-4 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={careerReadinessScoreData.breakdown}
                  dataKey="score"
                  nameKey="category"
                  innerRadius={42}
                  outerRadius={64}
                  paddingAngle={4}
                >
                  {careerReadinessScoreData.breakdown.map((entry, index) => (
                    <Cell
                      key={entry.category}
                      fill={
                        [
                          "hsl(var(--primary))",
                          "hsl(var(--secondary))",
                          "hsl(var(--chart-3))",
                          "hsl(var(--chart-4))",
                          "hsl(var(--chart-5))",
                        ][index % 5]
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="card-surface xl:col-span-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Notifications
            </h3>
            <FiBell className="size-4 text-secondary" />
          </div>
          <div className="mt-4 space-y-3">
            {notifications.map((item) => (
              <div key={item} className="rounded-md border border-border/80 bg-card/60 p-3">
                <p className="text-sm">{item}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <FiClock className="size-3" />
                  Just now
                </p>
              </div>
            ))}
          </div>
        </motion.article>
      </section>
    </div>
  );
}
