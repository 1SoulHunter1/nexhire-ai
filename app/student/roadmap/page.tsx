"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiActivity,
  FiBarChart2,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiMessageSquare,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

type SkillImpact = {
  id: string;
  label: string;
  impact: number;
  category: string;
};

const baseReadiness = 74;
const baseProbability = 45;
const targetRole = "Product Engineer";

const recommendedSkills: SkillImpact[] = [
  { id: "dsa", label: "DSA", impact: 15, category: "Core Engineering" },
  { id: "sql", label: "SQL", impact: 12, category: "Data Handling" },
  { id: "projects", label: "Projects", impact: 18, category: "Portfolio" },
  { id: "system-design", label: "System Design", impact: 20, category: "Architecture" },
  { id: "mock-interviews", label: "Mock Interviews", impact: 10, category: "Interview" },
];

const roadmapSteps = [
  {
    title: "Build Core Foundations",
    duration: "Week 1-2",
    detail: "Strengthen DSA patterns, SQL joins, and problem-solving speed.",
  },
  {
    title: "Ship Project Milestones",
    duration: "Week 3-5",
    detail: "Deliver 2 portfolio projects with measurable impact and clean documentation.",
  },
  {
    title: "Role Alignment Sprint",
    duration: "Week 6-7",
    detail: "Align resume bullets and mock interviews with Product Engineer role requirements.",
  },
  {
    title: "Interview Readiness Push",
    duration: "Week 8",
    detail: "Finalize behavioral stories, system-thinking answers, and coding confidence.",
  },
];

const roadmapStorageKey = "nexhire:student:roadmap:selected-skills";

const getAiInsights = (selectedSkillIds: string[], projectedProbability: number) => {
  if (selectedSkillIds.length === 0) {
    return [
      "Select at least one skill to simulate how your placement probability can improve.",
      "Start with DSA + Projects for the highest early momentum in product-focused roles.",
    ];
  }

  const insights: string[] = [];

  if (selectedSkillIds.includes("dsa")) {
    insights.push("DSA raises technical screening confidence and improves shortlist quality.");
  }

  if (selectedSkillIds.includes("projects")) {
    insights.push("Project depth strengthens your proof-of-work signal for recruiter evaluations.");
  }

  if (selectedSkillIds.includes("system-design")) {
    insights.push("System Design improves architecture discussions during technical interviews.");
  }

  if (selectedSkillIds.includes("mock-interviews")) {
    insights.push("Mock Interviews improve confidence, articulation, and round-to-round consistency.");
  }

  if (selectedSkillIds.includes("sql") && selectedSkillIds.includes("projects")) {
    insights.push("SQL + Projects combination increases your cross-functional execution score.");
  }

  if (projectedProbability >= 75) {
    insights.push("You are entering a high-probability zone; begin weekly mock interviews now.");
  } else if (projectedProbability >= 60) {
    insights.push("Trajectory is improving well; prioritize consistency and measurable outputs.");
  } else {
    insights.push("You are building momentum; add one portfolio milestone to accelerate growth.");
  }

  return insights.slice(0, 3);
};

export default function StudentRoadmapPage() {
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [savedAtLabel, setSavedAtLabel] = useState<string | null>(null);

  const selectedSkills = useMemo(
    () => recommendedSkills.filter((skill) => selectedSkillIds.includes(skill.id)),
    [selectedSkillIds]
  );

  const totalImpact = useMemo(
    () => selectedSkills.reduce((sum, skill) => sum + skill.impact, 0),
    [selectedSkills]
  );

  const projectedProbability = useMemo(() => Math.min(baseProbability + totalImpact, 95), [totalImpact]);

  const projectedReadiness = useMemo(
    () => Math.min(baseReadiness + Math.round(totalImpact * 0.65), 96),
    [totalImpact]
  );

  const aiInsights = useMemo(
    () => getAiInsights(selectedSkillIds, projectedProbability),
    [projectedProbability, selectedSkillIds]
  );

  const toggleSkill = (skillId: string) => {
    setSelectedSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const saveRoadmapPlan = () => {
    const payload = {
      selectedSkillIds,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(roadmapStorageKey, JSON.stringify(payload));
    setSavedAtLabel(new Date(payload.savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  };

  useEffect(() => {
    const raw = window.localStorage.getItem(roadmapStorageKey);

    if (!raw) {
      setIsHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as { selectedSkillIds?: string[]; savedAt?: string };
      const validSkillSet = new Set(recommendedSkills.map((skill) => skill.id));
      const safeSkills = (parsed.selectedSkillIds ?? []).filter((id) => validSkillSet.has(id));

      setSelectedSkillIds(safeSkills);

      if (parsed.savedAt) {
        setSavedAtLabel(
          new Date(parsed.savedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      }
    } catch {
      window.localStorage.removeItem(roadmapStorageKey);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  return (
    <div className="space-y-6">
      <section className="card-surface-soft relative overflow-hidden border-border/80 bg-card/80">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,hsl(var(--secondary)/0.18),transparent_35%),radial-gradient(circle_at_85%_20%,hsl(var(--primary)/0.2),transparent_40%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">AI Career Roadmap Generator</p>
          <h1 className="mt-2 text-2xl font-semibold">Skill-to-Placement Prediction Studio</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Simulate how strategic upskilling changes your placement probability for your target role.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
            <FiActivity className="size-3.5" /> Current Readiness
          </p>
          <p className="mt-2 text-2xl font-semibold">{baseReadiness}</p>
          <p className="mt-1 text-xs text-muted-foreground">AI baseline score</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
            <FiTarget className="size-3.5" /> Target Role
          </p>
          <p className="mt-2 text-2xl font-semibold">{targetRole}</p>
          <p className="mt-1 text-xs text-muted-foreground">Career direction lock</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted-foreground">
            <FiTrendingUp className="size-3.5" /> Current Probability
          </p>
          <p className="mt-2 text-2xl font-semibold">{baseProbability}%</p>
          <p className="mt-1 text-xs text-muted-foreground">Placement probability baseline</p>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-5">
          <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <FiLayers className="size-4" /> Recommended Skills
          </h2>

          <div className="mt-4 space-y-2.5">
            {recommendedSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-md border border-border/80 bg-background/45 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium">{skill.label}</p>
                  <p className="text-xs text-muted-foreground">{skill.category}</p>
                </div>
                <span className="rounded-full border border-secondary/35 bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary">
                  +{skill.impact}%
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-7">
          <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <FiBarChart2 className="size-4" /> Interactive Prediction Simulator
          </h2>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              {isHydrated && savedAtLabel
                ? `Last saved at ${savedAtLabel}`
                : "Select skills and save your plan to simulate persistent AI coaching."}
            </p>
            <button
              type="button"
              onClick={saveRoadmapPlan}
              className="inline-flex items-center gap-1 rounded-md border border-secondary/35 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary transition hover:border-secondary/55 hover:bg-secondary/15"
            >
              <FiCheckCircle className="size-3.5" /> Save Roadmap Plan
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              {recommendedSkills.map((skill) => {
                const active = selectedSkillIds.includes(skill.id);

                return (
                  <label
                    key={skill.id}
                    className={`flex cursor-pointer items-center justify-between rounded-md border px-3 py-2.5 transition ${
                      active
                        ? "border-primary/50 bg-primary/10"
                        : "border-border/80 bg-background/45 hover:border-secondary/45"
                    }`}
                  >
                    <span className="text-sm">{skill.label}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-secondary">+{skill.impact}%</span>
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggleSkill(skill.id)}
                        className="size-4 accent-[hsl(var(--primary))]"
                      />
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="rounded-lg border border-border/80 bg-background/45 p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Predicted Placement Probability</p>
              <div className="mt-3 flex items-end gap-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={projectedProbability}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="text-4xl font-semibold"
                  >
                    {projectedProbability}%
                  </motion.p>
                </AnimatePresence>
                <span className="mb-1 rounded-full border border-secondary/35 bg-secondary/10 px-2 py-0.5 text-xs text-secondary">
                  +{projectedProbability - baseProbability}%
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted/40">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  animate={{ width: `${projectedProbability}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                Base: {baseProbability}% • Selected skills impact: +{totalImpact}% • Projected readiness: {projectedReadiness}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-7">
          <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <FiZap className="size-4" /> Roadmap Timeline
          </h2>

          <div className="mt-4 space-y-4">
            {roadmapSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.24 }}
                className="relative rounded-md border border-border/80 bg-background/45 p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="mt-0.5 text-xs text-secondary">{step.duration}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-5">
          <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <FiMessageSquare className="size-4" /> AI Insights
          </h2>

          <div className="mt-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {aiInsights.map((insight) => (
                <motion.div
                  key={insight}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-md border border-border/80 bg-background/45 p-3"
                >
                  <p className="inline-flex items-center gap-2 text-sm">
                    <FiCpu className="size-4 text-secondary" />
                    <span className="text-muted-foreground">{insight}</span>
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4 rounded-md border border-secondary/35 bg-secondary/10 p-3">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-secondary">
              <FiCheckCircle className="size-4" /> Suggested next move
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Prioritize the top 2 selected skills this week and complete one proof-of-work artifact.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
