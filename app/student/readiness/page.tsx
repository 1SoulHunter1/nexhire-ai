"use client";

import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCompass,
  FiMapPin,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import { careerReadinessScoreData, skillsListData, studentProfileData } from "@/lib/mock-data";

const targetCareer = "Senior Product Engineer";
const distanceToGoal = 16;
const probability = 78;

const progressData = [
  {
    name: "Goal Progress",
    value: 100 - distanceToGoal,
    fill: "hsl(var(--primary))",
  },
];

const probabilityData = [
  {
    name: "Probability",
    value: probability,
    fill: "hsl(var(--secondary))",
  },
];

const roadmapNodes = [
  {
    id: "node-1",
    title: "Strengthen System Design",
    description: "Complete 2 architecture case studies and explain trade-offs clearly.",
    status: "in-progress" as const,
    eta: "10 days",
  },
  {
    id: "node-2",
    title: "Advance SQL + Analytics",
    description: "Build one end-to-end dashboard project with optimization notes.",
    status: "up-next" as const,
    eta: "2 weeks",
  },
  {
    id: "node-3",
    title: "Behavioral Interview Stories",
    description: "Prepare 6 STAR stories aligned to leadership and ownership signals.",
    status: "up-next" as const,
    eta: "1 week",
  },
  {
    id: "node-4",
    title: "Portfolio Signal Upgrade",
    description: "Add measurable impact metrics to top 3 projects and resume summary.",
    status: "planned" as const,
    eta: "5 days",
  },
];

const topReadySkills = skillsListData.filter((skill) => skill.proficiency === "Advanced").slice(0, 3);

export default function CareerGpsPage() {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="card-surface relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,hsl(var(--primary)/0.2),transparent_35%),radial-gradient(circle_at_85%_5%,hsl(var(--secondary)/0.22),transparent_35%)]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Career GPS</p>
            <h1 className="mt-2 text-2xl font-semibold">Navigation to Your Next Career Milestone</h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <FiMapPin className="size-4" />
              Tracking growth path for {studentProfileData.fullName}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-secondary/40 bg-secondary/10 px-3 py-2 text-sm text-secondary">
            <FiCompass className="size-4" />
            Live trajectory updated
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
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Position Matrix
          </h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-md border border-border/80 bg-card/60 p-3">
              <p className="text-xs text-muted-foreground">Current Position</p>
              <p className="mt-1 flex items-center gap-2 font-medium">
                <FiZap className="size-4 text-primary" />
                {careerReadinessScoreData.tier}
              </p>
            </div>
            <div className="rounded-md border border-border/80 bg-card/60 p-3">
              <p className="text-xs text-muted-foreground">Target Career</p>
              <p className="mt-1 flex items-center gap-2 font-medium">
                <FiTarget className="size-4 text-secondary" />
                {targetCareer}
              </p>
            </div>
            <div className="rounded-md border border-border/80 bg-card/60 p-3">
              <p className="text-xs text-muted-foreground">Distance to Goal</p>
              <p className="mt-1 flex items-center gap-2 font-medium text-primary">
                <FiArrowRight className="size-4" />
                {distanceToGoal}% remaining
              </p>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="card-surface xl:col-span-4"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Goal Completion
          </h2>
          <div className="mt-2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={progressData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
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
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-3xl font-semibold"
                >
                  {100 - distanceToGoal}%
                </text>
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-xs"
                >
                  Path covered
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground">
            Progress combines technical depth, interview readiness, and portfolio signal quality.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="card-surface xl:col-span-4"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Success Probability
          </h2>
          <div className="mt-2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={probabilityData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
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
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-3xl font-semibold"
                >
                  {probability}%
                </text>
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-xs"
                >
                  Offer probability
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="flex items-center gap-2 text-sm text-secondary">
            <FiTrendingUp className="size-4" />
            +6% compared to last week
          </p>
        </motion.article>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="card-surface"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Skills Roadmap
          </h2>
          <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary">4 nodes mapped</span>
        </div>

        <div className="relative space-y-4">
          <div className="pointer-events-none absolute left-[14px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          {roadmapNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.08, duration: 0.28 }}
              className="relative flex gap-4"
            >
              <div
                className={`relative mt-1 size-7 shrink-0 rounded-full border ${
                  node.status === "in-progress"
                    ? "border-primary/60 bg-primary/20"
                    : node.status === "up-next"
                    ? "border-secondary/60 bg-secondary/20"
                    : "border-border bg-muted"
                }`}
              >
                <div
                  className={`absolute inset-1 rounded-full ${
                    node.status === "in-progress"
                      ? "bg-primary"
                      : node.status === "up-next"
                      ? "bg-secondary"
                      : "bg-muted-foreground/40"
                  }`}
                />
              </div>

              <div className="flex-1 rounded-lg border border-border/80 bg-card/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium">{node.title}</p>
                  <span className="text-xs text-muted-foreground">ETA {node.eta}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{node.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <FiCheckCircle className="size-3.5 text-secondary" />
                  <span className="text-muted-foreground">
                    {node.status === "in-progress"
                      ? "Actively improving"
                      : node.status === "up-next"
                      ? "Queued next"
                      : "Planned"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-border/80 bg-card/60 p-4">
          <p className="text-sm font-medium">Fast-track Strengths</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {topReadySkills.map((skill) => (
              <span
                key={skill.name}
                className="rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 text-xs text-secondary"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
