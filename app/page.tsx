"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBarChart2,
  FiBriefcase,
  FiCpu,
  FiShield,
  FiZap,
  FiUsers,
} from "react-icons/fi";

const features = [
  {
    title: "AI Career Intelligence",
    description: "Predictive scoring for readiness, role fit, and growth trajectory.",
    icon: FiCpu,
  },
  {
    title: "Smart Job Matching",
    description: "Precision recommendations with transparent skill-based explanations.",
    icon: FiBriefcase,
  },
  {
    title: "Governance Analytics",
    description: "Placement compliance, approvals, and reporting for institutions.",
    icon: FiShield,
  },
  {
    title: "Recruiter Decision Hub",
    description: "Ranked candidates, faster shortlisting, and conversion insights.",
    icon: FiBarChart2,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create your profile",
    description: "Students, recruiters, and placement officers onboard with role-specific workflows.",
  },
  {
    step: "02",
    title: "Activate AI matching",
    description: "NexHire maps skills, goals, and market demand to generate opportunity fit scores.",
  },
  {
    step: "03",
    title: "Track outcomes",
    description: "Monitor dashboards, approvals, and reports to drive measurable placement success.",
  },
];

const screenshotCards = [
  "Student Command Dashboard",
  "Career GPS Navigator",
  "Recruiter Ranking Console",
  "Placement Governance Panel",
];

const testimonials = [
  {
    quote:
      "NexHire AI transformed our placement process with clear governance metrics and faster approvals.",
    author: "Ritika Sharma",
    role: "Placement Head, TechVista University",
  },
  {
    quote:
      "The match explanations help us shortlist confidently. It saves our team hours every week.",
    author: "Naveen Rao",
    role: "Talent Lead, QuantEdge Labs",
  },
  {
    quote:
      "Career GPS gave me a practical roadmap and helped me land interviews with top-fit roles.",
    author: "Aarav Kulkarni",
    role: "Final-Year Student",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
};

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_8%,hsl(var(--primary)/0.2),transparent_35%),radial-gradient(circle_at_85%_5%,hsl(var(--secondary)/0.18),transparent_35%)]" />

      <main className="app-container relative z-10 py-8 md:py-12">
        <motion.section {...fadeUp} className="card-surface relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--primary)/0.22),transparent_42%,hsl(var(--secondary)/0.2))]" />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs text-secondary">
                <FiZap className="size-3.5" />
                AI-Powered Hiring Ecosystem
              </span>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                NexHire AI for Smarter Campus Hiring
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                Unify student readiness, recruiter intelligence, and placement governance in one futuristic platform.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Get Started
                  <FiArrowRight className="size-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-background/60 px-4 py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/45 p-4 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border border-border/80 bg-card/70 p-3">
                  <p className="text-xs text-muted-foreground">Placement Rate</p>
                  <p className="mt-1 text-xl font-semibold">72.1%</p>
                </div>
                <div className="rounded-md border border-border/80 bg-card/70 p-3">
                  <p className="text-xs text-muted-foreground">Avg Match Score</p>
                  <p className="mt-1 text-xl font-semibold">88%</p>
                </div>
                <div className="rounded-md border border-border/80 bg-card/70 p-3">
                  <p className="text-xs text-muted-foreground">Active Recruiters</p>
                  <p className="mt-1 text-xl font-semibold">42</p>
                </div>
                <div className="rounded-md border border-border/80 bg-card/70 p-3">
                  <p className="text-xs text-muted-foreground">Open Roles</p>
                  <p className="mt-1 text-xl font-semibold">126</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-10 md:mt-14">
          <h2 className="text-2xl font-semibold">Features</h2>
          <p className="mt-2 text-sm text-muted-foreground">Built for every stakeholder in the campus hiring journey.</p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="card-surface-soft border-border/80 bg-card/80">
                  <span className="inline-flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </article>
              );
            })}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-10 md:mt-14">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {howItWorks.map((item) => (
              <article key={item.step} className="card-surface-soft border-border/80 bg-card/80">
                <span className="text-xs font-semibold tracking-[0.2em] text-secondary">{item.step}</span>
                <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-10 md:mt-14">
          <h2 className="text-2xl font-semibold">Screenshots</h2>
          <p className="mt-2 text-sm text-muted-foreground">Preview key product experiences across roles.</p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {screenshotCards.map((title) => (
              <article
                key={title}
                className="relative overflow-hidden rounded-xl border border-border/80 bg-card/70 p-4"
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,hsl(var(--primary)/0.18),transparent_45%,hsl(var(--secondary)/0.2))]" />
                <div className="relative h-40 rounded-lg border border-border/80 bg-background/55" />
                <p className="relative mt-3 text-sm font-medium">{title}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-10 md:mt-14">
          <h2 className="text-2xl font-semibold">Testimonials</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.author} className="card-surface-soft border-border/80 bg-card/80">
                <p className="text-sm text-foreground/90">“{item.quote}”</p>
                <div className="mt-4 border-t border-border/70 pt-3">
                  <p className="text-sm font-medium">{item.author}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.footer
          {...fadeUp}
          className="mt-10 mb-4 rounded-xl border border-border/80 bg-card/70 px-5 py-6 md:mt-14"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold">NexHire AI</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Intelligent hiring, governed outcomes, and career acceleration.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <FiUsers className="size-4" />
                Multi-role platform
              </span>
              <span>© 2026 NexHire AI</span>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
