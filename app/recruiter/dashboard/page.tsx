"use client";

import { useMemo, useState } from "react";
import {
  FiBarChart2,
  FiBriefcase,
  FiClock,
  FiFilter,
  FiSearch,
  FiUsers,
} from "react-icons/fi";

import { jobsListData, recruiterStatsData } from "@/lib/mock-data";

type WorkModeFilter = "All" | "Remote" | "Hybrid" | "Onsite";
type CandidateTierFilter = "All" | "Top" | "Strong";

type CandidateRow = {
  id: string;
  name: string;
  role: string;
  university: string;
  experience: string;
  matchScore: number;
  status: "Top" | "Strong" | "Review";
};

const candidateRankingData: CandidateRow[] = [
  {
    id: "cand_001",
    name: "Aarav Kulkarni",
    role: "Frontend Engineer",
    university: "Sahyadri College of Engineering",
    experience: "2 internships",
    matchScore: 94,
    status: "Top",
  },
  {
    id: "cand_002",
    name: "Diya Menon",
    role: "Product Analyst",
    university: "NITK Surathkal",
    experience: "1 internship",
    matchScore: 89,
    status: "Strong",
  },
  {
    id: "cand_003",
    name: "Rohan Shetty",
    role: "Data Associate",
    university: "MIT Manipal",
    experience: "Fresher",
    matchScore: 84,
    status: "Strong",
  },
  {
    id: "cand_004",
    name: "Neha Bhat",
    role: "Software Engineer Intern",
    university: "SJCE Mysuru",
    experience: "1 internship",
    matchScore: 78,
    status: "Review",
  },
];

const workModeOptions: WorkModeFilter[] = ["All", "Remote", "Hybrid", "Onsite"];
const candidateTierOptions: CandidateTierFilter[] = ["All", "Top", "Strong"];

const getMatchBadgeClass = (score: number) => {
  if (score >= 90) return "border-secondary/40 bg-secondary/10 text-secondary";
  if (score >= 80) return "border-primary/40 bg-primary/10 text-primary";
  return "border-border bg-muted/30 text-muted-foreground";
};

export default function RecruiterDashboardPage() {
  const [search, setSearch] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState<WorkModeFilter>("All");
  const [candidateTierFilter, setCandidateTierFilter] = useState<CandidateTierFilter>("All");

  const filteredJobs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return jobsListData.filter((job) => {
      const matchesTerm =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.matchedSkills.some((skill) => skill.toLowerCase().includes(term));

      const matchesWorkMode = workModeFilter === "All" ? true : job.workMode === workModeFilter;

      return matchesTerm && matchesWorkMode;
    });
  }, [search, workModeFilter]);

  const filteredCandidates = useMemo(() => {
    const term = search.trim().toLowerCase();

    return candidateRankingData.filter((candidate) => {
      const matchesTerm =
        !term ||
        candidate.name.toLowerCase().includes(term) ||
        candidate.role.toLowerCase().includes(term) ||
        candidate.university.toLowerCase().includes(term);

      const matchesTier =
        candidateTierFilter === "All"
          ? true
          : candidateTierFilter === "Top"
          ? candidate.status === "Top"
          : candidate.status === "Top" || candidate.status === "Strong";

      return matchesTerm && matchesTier;
    });
  }, [search, candidateTierFilter]);

  return (
    <div className="space-y-6">
      <section className="card-surface-soft border-border/80 bg-card/80">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Recruiter Operations</p>
            <h1 className="mt-1 text-2xl font-semibold">Recruiter Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor role performance, candidate quality, and hiring pipeline efficiency.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-background/60 px-3 py-2 text-sm text-muted-foreground">
            <FiClock className="size-4" />
            Updated 5 min ago
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Active Recruiters</p>
          <p className="mt-2 text-2xl font-semibold">{recruiterStatsData.activeRecruiters}</p>
          <p className="mt-1 text-xs text-muted-foreground">Across all live campus drives</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Open Campus Roles</p>
          <p className="mt-2 text-2xl font-semibold">{recruiterStatsData.openCampusRoles}</p>
          <p className="mt-1 text-xs text-muted-foreground">Roles currently accepting applications</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Shortlist Rate</p>
          <p className="mt-2 text-2xl font-semibold">{recruiterStatsData.shortlistRate}%</p>
          <p className="mt-1 text-xs text-muted-foreground">From viewed candidate profiles</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Offer Conversion</p>
          <p className="mt-2 text-2xl font-semibold">{recruiterStatsData.offerConversionRate}%</p>
          <p className="mt-1 text-xs text-muted-foreground">Invites converted into accepted offers</p>
        </article>
      </section>

      <section className="card-surface-soft space-y-4 border-border/80 bg-card/80">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FiFilter className="size-4" />
          Filters
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <label>
            <span className="mb-1 block text-xs text-muted-foreground">Search jobs or candidates</span>
            <div className="flex items-center gap-2 rounded-md border border-input bg-background/70 px-3 py-2">
              <FiSearch className="size-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title, skill, candidate"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </label>

          <label>
            <span className="mb-1 block text-xs text-muted-foreground">Job work mode</span>
            <select
              value={workModeFilter}
              onChange={(event) => setWorkModeFilter(event.target.value as WorkModeFilter)}
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
            <span className="mb-1 block text-xs text-muted-foreground">Candidate tier</span>
            <select
              value={candidateTierFilter}
              onChange={(event) => setCandidateTierFilter(event.target.value as CandidateTierFilter)}
              className="w-full rounded-md border border-input bg-background/70 px-3 py-2 text-sm outline-none"
            >
              {candidateTierOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">Job Listings</h2>
            <span className="text-xs text-muted-foreground">{filteredJobs.length} roles</span>
          </div>

          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div key={job.id} className="rounded-md border border-border/80 bg-background/45 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{job.company}</p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getMatchBadgeClass(
                      job.matchScore
                    )}`}
                  >
                    {job.matchScore}% match
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-border/80 px-2 py-0.5 text-xs text-muted-foreground">
                    {job.workMode}
                  </span>
                  <span className="rounded-full border border-border/80 px-2 py-0.5 text-xs text-muted-foreground">
                    {job.employmentType}
                  </span>
                  <span className="rounded-full border border-border/80 px-2 py-0.5 text-xs text-muted-foreground">
                    ₹{job.salaryRangeLPA} LPA
                  </span>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 ? (
              <p className="rounded-md border border-border/80 bg-background/45 p-3 text-sm text-muted-foreground">
                No job listings match the selected filters.
              </p>
            ) : null}
          </div>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Candidate Ranking
            </h2>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <FiUsers className="size-4" />
              Ranked by fit score
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border border-border/80">
            <table className="w-full min-w-[680px] divide-y divide-border/80 text-sm">
              <thead className="bg-background/50">
                <tr className="text-left text-xs uppercase tracking-[0.08em] text-muted-foreground">
                  <th className="px-3 py-2">Candidate</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Experience</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-right">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 bg-card/40">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-accent/20">
                    <td className="px-3 py-3">
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-xs text-muted-foreground">{candidate.university}</p>
                    </td>
                    <td className="px-3 py-3">{candidate.role}</td>
                    <td className="px-3 py-3">{candidate.experience}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs ${
                          candidate.status === "Top"
                            ? "border-secondary/40 bg-secondary/10 text-secondary"
                            : candidate.status === "Strong"
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border bg-muted/20 text-muted-foreground"
                        }`}
                      >
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${getMatchBadgeClass(
                          candidate.matchScore
                        )}`}
                      >
                        <FiBarChart2 className="mr-1 size-3.5" />
                        {candidate.matchScore}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCandidates.length === 0 ? (
            <p className="mt-3 rounded-md border border-border/80 bg-background/45 p-3 text-sm text-muted-foreground">
              No candidates match the selected filters.
            </p>
          ) : null}
        </article>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="card-surface-soft border-border/80 bg-card/80">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FiBriefcase className="size-4" />
            <p className="text-xs uppercase tracking-[0.1em]">Jobs reviewed today</p>
          </div>
          <p className="mt-2 text-xl font-semibold">12</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FiUsers className="size-4" />
            <p className="text-xs uppercase tracking-[0.1em]">Candidates shortlisted</p>
          </div>
          <p className="mt-2 text-xl font-semibold">28</p>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FiClock className="size-4" />
            <p className="text-xs uppercase tracking-[0.1em]">Avg response time</p>
          </div>
          <p className="mt-2 text-xl font-semibold">{recruiterStatsData.avgResponseTimeHours} hrs</p>
        </article>
      </section>
    </div>
  );
}
