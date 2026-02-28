"use client";

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiCheckCircle,
  FiFileText,
  FiLoader,
  FiTrendingUp,
  FiUploadCloud,
  FiX,
  FiZap,
} from "react-icons/fi";

type ResumeAnalysis = {
  summary: string;
  extractedSkills: string[];
  readinessBefore: number;
  readinessAfter: number;
  suggestions: string[];
};

const predefinedSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "REST APIs",
  "SQL",
  "Python",
  "Git",
  "Problem Solving",
  "Data Structures",
  "Communication",
  "Leadership",
  "AWS Fundamentals",
  "Testing",
];

const suggestionPool = [
  "Add measurable outcomes for your last 2 projects (performance, users, or impact).",
  "Move your strongest technical stack closer to the top summary for faster recruiter scanning.",
  "Include links to GitHub and a live project demo for portfolio credibility.",
  "Add one cloud or deployment line (e.g., Vercel, AWS, Docker) to improve backend-readiness signal.",
  "Strengthen ATS keywords by mirroring job-description terms for target roles.",
  "Show collaboration impact with one bullet about team ownership or cross-functional delivery.",
  "Include testing/tooling experience (Jest, Cypress, linting) to improve engineering maturity score.",
  "Refine role-specific headline to align with Product Engineer / Frontend Engineer positions.",
];

const acceptedExtensions = [".pdf", ".doc", ".docx"];

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const hasSupportedExtension = (fileName: string) => {
  const lowerFileName = fileName.toLowerCase();
  return acceptedExtensions.some((ext) => lowerFileName.endsWith(ext));
};

const pickRandomUnique = (items: string[], count: number) => {
  const pool = [...items];
  const picked: string[] = [];

  while (pool.length > 0 && picked.length < count) {
    const index = Math.floor(Math.random() * pool.length);
    const [item] = pool.splice(index, 1);
    picked.push(item);
  }

  return picked;
};

const generateMockAnalysis = (): ResumeAnalysis => {
  const extractedSkills = pickRandomUnique(predefinedSkills, Math.floor(Math.random() * 4) + 6);
  const readinessAfter = Math.floor(Math.random() * 31) + 60;
  const readinessIncrease = Math.floor(Math.random() * 9) + 3;
  const readinessBefore = Math.max(50, readinessAfter - readinessIncrease);

  const summaryVariants = [
    "AI parsing shows a strong technical baseline with scope to improve impact storytelling and role alignment.",
    "Your resume reflects relevant stack exposure; stronger quantified achievements can significantly lift recruiter response.",
    "The profile is promising for early-career engineering roles; refining keywords and outcomes boosts readiness confidence.",
  ];

  return {
    summary: summaryVariants[Math.floor(Math.random() * summaryVariants.length)],
    extractedSkills,
    readinessBefore,
    readinessAfter,
    suggestions: pickRandomUnique(suggestionPool, 3),
  };
};

export default function StudentResumePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadIntervalRef = useRef<number | null>(null);

  const processingStage = useMemo(() => {
    if (uploadProgress < 35) return "Parsing resume layout...";
    if (uploadProgress < 70) return "Extracting skills and role signals...";
    if (uploadProgress < 100) return "Scoring readiness and generating suggestions...";
    return "Finalizing AI insights...";
  }, [uploadProgress]);

  const readinessIncrease = useMemo(() => {
    if (!analysis) return 0;
    return analysis.readinessAfter - analysis.readinessBefore;
  }, [analysis]);

  const resetUpload = () => {
    if (uploadIntervalRef.current) {
      window.clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }

    setSelectedFile(null);
    setIsDragging(false);
    setIsUploading(false);
    setUploadProgress(0);
    setAnalysis(null);
    setErrorMessage("");
  };

  const simulateUploadAndAnalysis = (file: File) => {
    if (uploadIntervalRef.current) {
      window.clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }

    setSelectedFile(file);
    setErrorMessage("");
    setAnalysis(null);
    setUploadProgress(0);
    setIsUploading(true);

    const totalDurationMs = 2000;
    const tickMs = 100;
    const maxTicks = totalDurationMs / tickMs;
    let tickCount = 0;

    uploadIntervalRef.current = window.setInterval(() => {
      tickCount += 1;
      const nextProgress = Math.min(Math.round((tickCount / maxTicks) * 100), 100);
      setUploadProgress(nextProgress);

      if (tickCount >= maxTicks) {
        if (uploadIntervalRef.current) {
          window.clearInterval(uploadIntervalRef.current);
          uploadIntervalRef.current = null;
        }

        setIsUploading(false);
        setAnalysis(generateMockAnalysis());
      }
    }, tickMs);
  };

  const processFile = (file: File | null) => {
    if (!file) return;

    if (!hasSupportedExtension(file.name)) {
      setErrorMessage("Only PDF or DOC files are supported.");
      return;
    }

    simulateUploadAndAnalysis(file);
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(event.target.files ?? []);
    processFile(file ?? null);
  };

  const onDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    processFile(file);
  };

  return (
    <div className="space-y-6">
      <section className="card-surface-soft border-border/80 bg-card/80">
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Resume Intelligence</p>
        <h1 className="mt-2 text-2xl font-semibold">Upload Resume for AI Analysis</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload a PDF or DOC resume to preview extracted skills and readiness impact.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <motion.article
          layout
          className="card-surface-soft border-border/80 bg-card/80 xl:col-span-7"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Resume Upload
            </h2>
            {selectedFile ? (
              <button
                type="button"
                onClick={resetUpload}
                className="inline-flex items-center gap-1 rounded-md border border-border/80 px-2 py-1 text-xs text-muted-foreground transition hover:text-foreground"
              >
                <FiX className="size-3.5" />
                Clear
              </button>
            ) : null}
          </div>

          <label
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition ${
              isDragging
                ? "border-primary/70 bg-primary/10"
                : "border-border/80 bg-background/40 hover:border-secondary/60 hover:bg-background/55"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={onFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />

            <motion.div
              animate={isDragging ? { scale: 1.04 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="inline-flex size-14 items-center justify-center rounded-full border border-secondary/35 bg-secondary/10 text-secondary"
            >
              <FiUploadCloud className="size-7" />
            </motion.div>

            <p className="mt-4 text-sm font-medium">Drag & drop your resume here</p>
            <p className="mt-1 text-xs text-muted-foreground">
              or click to browse files ({acceptedExtensions.join(", ")})
            </p>
          </label>

          {errorMessage ? (
            <p className="mt-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </p>
          ) : null}

          {selectedFile ? (
            <div className="mt-4 rounded-lg border border-border/80 bg-background/45 p-3">
              <div className="flex items-center gap-2 text-sm">
                <FiFileText className="size-4 text-primary" />
                <span className="font-medium">{selectedFile.name}</span>
                <span className="text-xs text-muted-foreground">({formatBytes(selectedFile.size)})</span>
              </div>

              <AnimatePresence>
                {isUploading ? (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-3"
                  >
                    <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <FiLoader className="size-3.5 animate-spin" /> {processingStage}
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted/40">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ) : null}
        </motion.article>

        <motion.article
          layout
          className="card-surface-soft border-border/80 bg-card/80 xl:col-span-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Analysis Status
          </h2>

          {!analysis ? (
            isUploading ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg border border-primary/35 bg-primary/10 p-4"
              >
                <p className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <FiLoader className="size-4 animate-spin" /> AI analysis in progress
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our engine is parsing your resume, extracting skills, and simulating recruiter-readiness scoring.
                </p>
              </motion.div>
            ) : (
              <div className="mt-4 rounded-lg border border-border/80 bg-background/40 p-4 text-sm text-muted-foreground">
                Upload a resume to generate mock AI analysis, extracted skills, and readiness impact.
              </div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28 }}
              className="mt-4 space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-secondary/35 bg-secondary/10 p-4"
              >
                <div className="flex items-center gap-2 text-secondary">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 16 }}
                  >
                    <FiCheckCircle className="size-5" />
                  </motion.div>
                  <p className="text-sm font-medium">Analysis Completed Successfully</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{analysis.summary}</p>
              </motion.div>

              <div className="rounded-lg border border-border/80 bg-background/45 p-4">
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium">
                  <FiAward className="size-4 text-primary" /> Extracted Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.extractedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-background/45 p-4">
                <p className="inline-flex items-center gap-2 text-sm font-medium">
                  <FiTrendingUp className="size-4 text-secondary" /> Readiness Score Improvement
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="rounded-md border border-border/80 bg-card/70 px-2 py-1 text-muted-foreground">
                    {analysis.readinessBefore}
                  </span>
                  <span className="text-muted-foreground">→</span>
                  <span className="rounded-md border border-secondary/40 bg-secondary/10 px-2 py-1 font-medium text-secondary">
                    {analysis.readinessAfter}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-secondary/35 bg-secondary/10 px-2 py-0.5 text-xs text-secondary">
                    <FiZap className="size-3" /> +{readinessIncrease}
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-border/80 bg-background/45 p-4">
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium">
                  <FiZap className="size-4 text-secondary" /> Improvement Suggestions
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {analysis.suggestions.map((suggestion) => (
                    <li key={suggestion} className="rounded-md border border-border/70 bg-card/50 px-3 py-2">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </motion.article>
      </section>
    </div>
  );
}
