"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCpu, FiSend, FiUser, FiZap } from "react-icons/fi";

type Sender = "user" | "ai";

type ChatMessage = {
  id: string;
  sender: Sender;
  content: string;
};

const suggestedPrompts = [
  "How do I get placed in a product company?",
  "What skills should I learn next?",
  "Improve my resume",
  "Roadmap for software engineering",
];

const starterMessages: ChatMessage[] = [
  {
    id: "ai-welcome",
    sender: "ai",
    content:
      "Hi, I’m your AI Career Mentor. Ask me about placements, resume strategy, skills, roadmap planning, and interview prep.",
  },
];

const getMockMentorResponse = (input: string) => {
  const text = input.toLowerCase();

  if (text.includes("product")) {
    return "For product companies, build depth in DSA, system design basics, and 2 strong projects. A practical plan is: solve 4-5 DSA problems daily, study one system-design topic weekly, and ship one end-to-end project with metrics (latency, users, conversion). Recruiters usually shortlist profiles that show both problem-solving and product-thinking.";
  }

  if (text.includes("resume")) {
    return "Improve your resume by making every bullet impact-based: use action + metric + outcome (e.g., 'Reduced API response time by 32%'). Keep top 2 projects above the fold, align keywords with your target job description, and include GitHub/live links. Also keep it one page with clean, scannable sections.";
  }

  if (text.includes("interview")) {
    return "For interview prep, use a 3-track routine each week: (1) coding rounds with timed DSA sets, (2) system/design discussions using real apps, and (3) behavioral storytelling with STAR format. After each mock, write down mistakes and re-attempt similar questions within 48 hours for retention.";
  }

  if (text.includes("roadmap") || text.includes("plan")) {
    return "Here’s a practical roadmap: Weeks 1-2 strengthen fundamentals (DSA + SQL), Weeks 3-5 build and polish 2 portfolio projects, Weeks 6-7 do mock interviews and resume targeting, Week 8 focus on applications and referral outreach. Track progress weekly and keep one measurable deliverable every 7 days.";
  }

  if (text.includes("skill") || text.includes("learn") || text.includes("upskill")) {
    return "A high-impact skill stack for placements is DSA + SQL + projects + communication. Learn in cycles: study concept, build mini implementation, then explain it as if in an interview. That makes your profile both ATS-friendly and interview-ready.";
  }

  return "You’re on the right track. To accelerate career growth, choose one target role, map required skills, and follow a weekly system: 5 days learning, 1 day project implementation, 1 day review and application strategy. Consistency plus measurable outcomes is what usually drives placement success.";
};

export default function StudentMentorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [nextId, setNextId] = useState(1);
  const conversationRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => draft.trim().length > 0 && !isTyping, [draft, isTyping]);

  useEffect(() => {
    const panel = conversationRef.current;
    if (!panel) return;
    panel.scrollTop = panel.scrollHeight;
  }, [messages, isTyping]);

  const queueMentorReply = (input: string) => {
    setIsTyping(true);

    window.setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}-${nextId}`,
        sender: "ai",
        content: getMockMentorResponse(input),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setNextId((prev) => prev + 1);
      setIsTyping(false);
    }, 1100);
  };

  const sendMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${nextId}`,
      sender: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setNextId((prev) => prev + 1);
    setDraft("");
    queueMentorReply(trimmed);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div className="space-y-6">
      <section className="card-surface-soft relative overflow-hidden border-border/80 bg-card/80">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,hsl(var(--secondary)/0.15),transparent_35%),radial-gradient(circle_at_90%_0%,hsl(var(--primary)/0.18),transparent_35%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">AI Career Mentor</p>
          <h1 className="mt-2 text-2xl font-semibold">Mentor Chat Assistant</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Chat with your AI mentor for career advice, skill recommendations, and placement guidance.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Conversation</h2>
            <span className="inline-flex items-center gap-1 rounded-full border border-secondary/35 bg-secondary/10 px-2 py-0.5 text-xs text-secondary">
              <FiZap className="size-3" /> Prototype Mode
            </span>
          </div>

          <div
            ref={conversationRef}
            className="h-[440px] space-y-3 overflow-y-auto rounded-lg border border-border/80 bg-background/45 p-3"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {messages.map((message) => {
                const isUser = message.sender === "user";

                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser ? (
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-secondary/35 bg-secondary/10 text-secondary">
                        <FiCpu className="size-4" />
                      </span>
                    ) : null}

                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        isUser
                          ? "border border-primary/45 bg-primary/15 text-foreground"
                          : "border border-border/80 bg-card/80 text-muted-foreground"
                      }`}
                    >
                      {message.content}
                    </div>

                    {isUser ? (
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-primary">
                        <FiUser className="size-4" />
                      </span>
                    ) : null}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <AnimatePresence>
              {isTyping ? (
                <motion.div
                  key="ai-typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-start gap-2"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-secondary/35 bg-secondary/10 text-secondary">
                    <FiCpu className="size-4" />
                  </span>
                  <div className="rounded-2xl border border-border/80 bg-card/80 px-3.5 py-2.5 text-sm text-muted-foreground">
                    AI is typing...
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask your AI mentor..."
              className="h-11 flex-1 rounded-md border border-input bg-background/70 px-3 text-sm outline-none transition focus:border-ring"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-4 text-sm font-medium text-primary-foreground shadow-soft transition enabled:hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSend className="size-4" /> Send
            </button>
          </form>
        </article>

        <article className="card-surface-soft border-border/80 bg-card/80 xl:col-span-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Suggested Prompts</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Use quick prompts to explore placement strategy and personalized guidance.
          </p>

          <div className="mt-4 space-y-2.5">
            {suggestedPrompts.map((prompt) => (
              <motion.button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-md border border-border/80 bg-background/45 px-3 py-2.5 text-left text-sm text-foreground transition hover:border-secondary/40 hover:bg-background/60"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
