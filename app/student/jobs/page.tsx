"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  FiBriefcase,
  FiCheckCircle,
  FiFilter,
  FiMapPin,
  FiSearch,
  FiSliders,
  FiX,
  FiZap,
} from "react-icons/fi";

import { jobsListData, skillsListData } from "@/lib/mock-data";

type WorkModeFilter = "All" | "Remote" | "Hybrid" | "Onsite";
type MatchFilter = "All" | "80+" | "90+";

const workModeOptions: WorkModeFilter[] = ["All", "Remote", "Hybrid", "Onsite"];
const matchOptions: MatchFilter[] = ["All", "80+", "90+"];

const prioritySkills = skillsListData
  .filter((skill) => skill.marketDemand === "High")
  .map((skill) => skill.name);

export default function StudentJobsPage() {
  const [search, setSearch] = useState("");
  const [workMode, setWorkMode] = useState<WorkModeFilter>("All");
  const [matchFilter, setMatchFilter] = useState<MatchFilter>("All");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    const searchQuery = search.trim().toLowerCase();

    return jobsListData.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery) ||
        job.company.toLowerCase().includes(searchQuery) ||
        job.matchedSkills.some((skill) => skill.toLowerCase().includes(searchQuery));

      const matchesWorkMode = workMode === "All" ? true : job.workMode === workMode;

      const matchesScore =
        matchFilter === "All"
          ? true
          : matchFilter === "90+"
          ? job.matchScore >= 90
          : job.matchScore >= 80;

      return matchesSearch && matchesWorkMode && matchesScore;
    });
  }, [search, workMode, matchFilter]);

  const selectedJob = useMemo(
    () => filteredJobs.find((job) => job.id === selectedJobId) ?? jobsListData.find((job) => job.id === selectedJobId),
    [filteredJobs, selectedJobId]
  );

  const handleApply = (jobId: string) => {
    setAppliedJobIds((previous) => (previous.includes(jobId) ? previous : [...previous, jobId]));
  };

  const getMatchTone = (score: number) => {
    if (score >= 90) return "text-secondary border-secondary/40 bg-secondary/10";
    if (score >= 80) return "text-primary border-primary/40 bg-primary/10";
    return "text-muted-foreground border-border bg-muted/30";
  };

  const getMatchExplanation = (skills: string[]) => {
    const alignedSkills = skills.filter((skill) => prioritySkills.includes(skill));
    const missingHotSkill = prioritySkills.find((skill) => !skills.includes(skill));

    if (alignedSkills.length >= 3) {
      return `Strong role alignment across ${alignedSkills.slice(0, 3).join(", ")} with high recruiter demand signals.`;
    }

    if (alignedSkills.length > 0) {
      return `Good match due to ${alignedSkills.join(", ")}. Adding ${missingHotSkill ?? "advanced problem solving"} can improve fit.`;
    }

    return "Moderate fit currently. Improve one in-demand technical skill to raise shortlist probability.";
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card-surface relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_25%,hsl(var(--primary)/0.2),transparent_35%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary)/0.18),transparent_35%)]" />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Job Matching</p>
            <h1 className="mt-1 text-2xl font-semibold">Find Roles That Fit Your Profile</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              AI-ranked recommendations with transparent match explanations.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-secondary/40 bg-secondary/10 px-3 py-2 text-sm text-secondary">
            <FiZap className="size-4" />
            {filteredJobs.length} opportunities matched
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
        className="card-surface space-y-4"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FiFilter className="size-4" />
          Filters
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <label className="lg:col-span-2">
            <span className="mb-1 block text-xs text-muted-foreground">Search role, company, skill</span>
            <div className="flex items-center gap-2 rounded-md border border-input bg-background/70 px-3 py-2">
              <FiSearch className="size-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="e.g. Frontend, SQL"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </label>

          <label>
            <span className="mb-1 block text-xs text-muted-foreground">Work mode</span>
            <select
              value={workMode}
              onChange={(event) => setWorkMode(event.target.value as WorkModeFilter)}
              className="w-full rounded-md border border-input bg-background/70 px-3 py-2 text-sm outline-none"
            >
              {workModeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1 block text-xs text-muted-foreground">Match score</span>
            <select
              value={matchFilter}
              onChange={(event) => setMatchFilter(event.target.value as MatchFilter)}
              className="w-full rounded-md border border-input bg-background/70 px-3 py-2 text-sm outline-none"
            >
              {matchOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filteredJobs.map((job, index) => {
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.04, duration: 0.25 }}
              className="card-surface space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <FiMapPin className="size-4" />
                    {job.company} • {job.location}
                  </p>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getMatchTone(job.matchScore)}`}>
                  {job.matchScore}% Match
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-border/80 bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
                  {job.employmentType}
                </span>
                <span className="rounded-full border border-border/80 bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
                  {job.workMode}
                </span>
                <span className="rounded-full border border-border/80 bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
                  ₹{job.salaryRangeLPA} LPA
                </span>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Profile fit</span>
                  <span>{job.matchScore}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${job.matchScore}%` }}
                  />
                </div>
              </div>

              <div className="rounded-md border border-border/80 bg-card/60 p-3">
                <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Match Explanation</p>
                <p className="mt-1 text-sm text-foreground/90">{getMatchExplanation(job.matchedSkills)}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {job.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-secondary/35 bg-secondary/10 px-2 py-0.5 text-xs text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedJobId(job.id)}
                  className="inline-flex items-center gap-2 rounded-md border border-border/80 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                >
                  <FiSliders className="size-4" />
                  View details
                </button>

                <button
                  type="button"
                  disabled={isApplied}
                  onClick={() => handleApply(job.id)}
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isApplied ? <FiCheckCircle className="size-4" /> : <FiBriefcase className="size-4" />}
                  {isApplied ? "Applied" : "Apply"}
                </button>
              </div>
            </motion.article>
          );
        })}
      </section>

      {filteredJobs.length === 0 ? (
        <div className="card-surface text-center">
          <p className="text-sm text-muted-foreground">No roles match your filters. Adjust criteria to see more jobs.</p>
        </div>
      ) : null}

      {selectedJob ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="card-surface w-full max-w-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{selectedJob.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedJob.company} • {selectedJob.location} • Posted {selectedJob.postedDaysAgo} days ago
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobId(null)}
                className="rounded-md border border-border/80 p-2 text-muted-foreground transition hover:text-foreground"
                aria-label="Close modal"
              >
                <FiX className="size-4" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-border/80 bg-card/60 p-3">
                <p className="text-xs text-muted-foreground">Compensation</p>
                <p className="mt-1 text-sm font-medium">₹{selectedJob.salaryRangeLPA} LPA</p>
              </div>
              <div className="rounded-md border border-border/80 bg-card/60 p-3">
                <p className="text-xs text-muted-foreground">Employment</p>
                <p className="mt-1 text-sm font-medium">{selectedJob.employmentType}</p>
              </div>
              <div className="rounded-md border border-border/80 bg-card/60 p-3">
                <p className="text-xs text-muted-foreground">Work mode</p>
                <p className="mt-1 text-sm font-medium">{selectedJob.workMode}</p>
              </div>
              <div className="rounded-md border border-border/80 bg-card/60 p-3">
                <p className="text-xs text-muted-foreground">Match probability</p>
                <p className="mt-1 text-sm font-medium text-secondary">{selectedJob.matchScore}%</p>
              </div>
            </div>

            <div className="mt-5 rounded-md border border-border/80 bg-card/60 p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Why this role matches you</p>
              <p className="mt-2 text-sm text-foreground/90">{getMatchExplanation(selectedJob.matchedSkills)}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedJob.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-secondary/35 bg-secondary/10 px-2.5 py-1 text-xs text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedJobId(null)}
                className="rounded-md border border-border/80 px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApply(selectedJob.id);
                  setSelectedJobId(null);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                <FiBriefcase className="size-4" />
                Apply now
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
