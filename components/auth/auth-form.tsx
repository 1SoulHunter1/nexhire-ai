"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { FiBriefcase, FiLock, FiMail, FiUser } from "react-icons/fi";

type Role = "student" | "recruiter" | "placement";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

const roleOptions: { value: Role; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "recruiter", label: "Recruiter" },
  { value: "placement", label: "Placement Officer" },
];

const roleRedirectMap: Record<Role, string> = {
  student: "/student/dashboard",
  recruiter: "/recruiter/dashboard",
  placement: "/placement/dashboard",
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") as Role | null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(
    initialRoleParam && roleRedirectMap[initialRoleParam]
      ? initialRoleParam
      : "student"
  );

  const isLogin = mode === "login";

  const heading = useMemo(
    () => (isLogin ? "Welcome Back" : "Create Your Account"),
    [isLogin]
  );

  const subheading = useMemo(
    () =>
      isLogin
        ? "Sign in to continue to NexHire AI"
        : "Join NexHire AI and set up your role",
    [isLogin]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      router.push(roleRedirectMap[role]);
      return;
    }

    router.push(`/login?role=${role}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.35),transparent_40%),radial-gradient(circle_at_80%_10%,hsl(var(--secondary)/0.25),transparent_35%),linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--card))_100%)]" />
      <main className="app-container relative z-10 flex min-h-screen items-center justify-center py-10">
        <section className="card-surface w-full max-w-md space-y-6">
          <header className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
            <p className="text-sm text-muted-foreground">{subheading}</p>
          </header>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin ? (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-foreground">Full Name</span>
                <div className="flex items-center gap-2 rounded-md border border-input bg-background/70 px-3 py-2 transition focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
                  <FiUser className="size-4 text-muted-foreground" />
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </label>
            ) : null}

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">Email</span>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background/70 px-3 py-2 transition focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
                <FiMail className="size-4 text-muted-foreground" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">Password</span>
              <div className="flex items-center gap-2 rounded-md border border-input bg-background/70 px-3 py-2 transition focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
                <FiLock className="size-4 text-muted-foreground" />
                <input
                  required
                  minLength={8}
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </label>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Role</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {roleOptions.map((option) => {
                  const isActive = role === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRole(option.value)}
                      className={`rounded-md border px-3 py-2 text-xs font-medium transition ${
                        isActive
                          ? "border-primary/70 bg-primary/20 text-primary"
                          : "border-border bg-background/60 text-muted-foreground hover:border-secondary/60 hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95"
            >
              <FiBriefcase className="size-4" />
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "New to NexHire AI?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/register" : "/login"}
              className="font-medium text-secondary transition hover:text-primary"
            >
              {isLogin ? "Register" : "Sign in"}
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
