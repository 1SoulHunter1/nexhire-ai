# NexHire AI — Intelligent Career Navigation & Placement Intelligence Platform

<p align="center">
	<img src="./public/logo-placeholder.png" alt="NexHire AI Logo Placeholder" width="140" />
</p>

<p align="center">
	🚀 AI-powered campus hiring intelligence for students, recruiters, and placement officers.
</p>

<p align="center">
	<img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
	<img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
	<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
	<img src="https://img.shields.io/badge/shadcn/ui-Enabled-111827" alt="shadcn ui" />
	<img src="https://img.shields.io/badge/Recharts-DataViz-22C55E" alt="Recharts" />
	<img src="https://img.shields.io/badge/Framer_Motion-Animations-9333EA" alt="Framer Motion" />
	<img src="https://img.shields.io/badge/Status-Frontend_Prototype-orange" alt="Prototype" />
</p>

---

## 1) Introduction / Overview

NexHire AI is an AI-powered career intelligence and campus placement platform designed to modernize traditional hiring workflows into a transparent, skill-driven, and data-backed ecosystem.

The platform delivers:
- 🎓 Personalized career navigation for students
- 🧠 Intelligent candidate discovery for recruiters
- 🛡️ Governance and compliance tools for placement officers

This version is a **frontend prototype for a hackathon**, built with realistic mock data to demonstrate complete end-to-end product UX.

---

## 2) Problem Statement

Campus placement systems often suffer from:

| Challenge | Impact |
|---|---|
| Limited career visibility for students | Poor readiness planning and unclear progression |
| Manual recruiter shortlisting | Slower hiring cycles and inconsistent decisions |
| Low transparency in match quality | Reduced trust in hiring outcomes |
| Weak governance tracking | Compliance risks in approvals and placement policy |

---

## 3) Solution Overview

NexHire AI addresses these gaps through a unified multi-role intelligence layer:

1. 📍 **Career navigation engine** for student growth planning
2. 🎯 **Job and candidate match intelligence** with explanation-first scoring
3. 📊 **Governance dashboards** for auditable placement decisions
4. ⚡ **Modern UX** with role-based flows for Student, Recruiter, and Placement Officer

---

## 4) Key Features

| Feature | Description |
|---|---|
| 🧭 Career GPS Dashboard | Maps current readiness to target career path with roadmap nodes |
| 📈 AI Readiness Score | Visual readiness index with breakdown insights |
| 💼 Job Matching System | Match-scored job recommendations with explanations and filters |
| 🧩 Skill Gap Insights | High-demand skill deficiencies and improvement priorities |
| 📄 AI Resume Analysis | Drag-and-drop resume upload simulation with extracted skills, readiness deltas, and improvement tips |
| 🗺️ AI Career Roadmap Generator | Skill impact simulator with probability prediction (capped), timeline plan, and AI insight panel |
| 💬 AI Career Mentor Chat | Interactive mentor chat with suggested prompts, typing state, and keyword-aware mock responses |
| 🧑‍💼 Recruiter Intelligence Dashboard | Candidate rankings, role filters, and shortlist intelligence |
| 🏛️ Placement Governance Panel | Eligibility rules, approvals workflow, analytics, and reports |
| 🔐 Session UX Improvements | Functional sign-out flow and route prefetching for faster sidebar navigation |

---

## 5) System Architecture (Frontend Prototype)

```text
┌──────────────────────────────────────────────────────────────┐
│                        NexHire AI UI                        │
│                     (Next.js App Router)                    │
└──────────────────────────────────────────────────────────────┘
							 │
							 ├── Student Experience
							 │    ├─ Dashboard
							 │    ├─ Career GPS / Readiness
							 │    ├─ Job Matching
							 │    ├─ Resume Analysis
							 │    ├─ Career Roadmap Generator
							 │    └─ AI Career Mentor Chat
							 │
							 ├── Recruiter Experience
							 │    ├─ Dashboard (Stats + Filters)
							 │    ├─ Open Roles
							 │    ├─ Candidates
							 │    └─ Analytics
							 │
							 └── Placement Officer Experience
										├─ Dashboard (Governance Analytics)
										├─ Students
										├─ Drive Management
										└─ Reports

Data Source: Local mock datasets (`lib/mock-data.ts`)
```

> Note: Current implementation is frontend-only. Backend APIs, auth services, and model inference are planned for future integration.

---

## 6) Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Charts | Recharts |
| Icons | React Icons |
| State/Data | Local mock data (prototype) |

---

## 7) Folder Structure

```bash
nexhire-ai/
├── app/
│   ├── page.tsx
│   ├── login/
│   ├── register/
│   ├── student/
│   │   ├── dashboard/
│   │   ├── jobs/
│   │   ├── readiness/
│   │   ├── resume/
│   │   ├── roadmap/
│   │   ├── mentor/
│   │   └── profile/
│   ├── recruiter/
│   │   ├── dashboard/
│   │   ├── roles/
│   │   ├── candidates/
│   │   └── analytics/
│   └── placement/
│       ├── dashboard/
│       ├── students/
│       ├── drives/
│       └── reports/
├── components/
│   ├── auth/
│   ├── dashboard/
│   └── ui/
├── lib/
│   ├── mock-data.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── tailwind.config.ts
└── package.json
```

---

## 8) Installation & Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+

### Install

```bash
git clone https://github.com/1SoulHunter1/nexhire-ai.git
cd nexhire-ai
npm install
```

---

## 9) Running the Project

### Development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## 10) Screenshots (Placeholder)

Add product screenshots here:

- Landing Page
- Student Dashboard
- Career GPS
- Job Matching
- Resume Analysis
- Career Roadmap Generator
- AI Career Mentor
- Recruiter Dashboard
- Placement Governance Panel

```markdown
![Landing](./docs/screenshots/landing.png)
![Student Dashboard](./docs/screenshots/student-dashboard.png)
![Recruiter Dashboard](./docs/screenshots/recruiter-dashboard.png)
```

---

## 11) Future Enhancements (Backend + AI Integration)

- 🔐 Role-based authentication and access control (JWT/OAuth)
- 🗄️ Database integration (PostgreSQL/MongoDB)
- 🤖 AI recommendation engine for readiness and match scoring
- 📡 Real-time notifications and recruiter actions
- 📄 Exportable analytics and governance reports (PDF/CSV)
- 🧪 Testing pipeline (unit, integration, e2e)
- ☁️ CI/CD and cloud deployment with observability

---

## 12) Contribution Guidelines

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes

```bash
git commit -m "feat: add your feature"
```

4. Push and open a Pull Request

```bash
git push origin feature/your-feature-name
```

Please ensure consistent coding style and run checks before submitting:

```bash
npm run lint
npm run build
```

---

## 13) License

This project is released under the **MIT License**.

> If you plan to keep this hackathon prototype private/restricted, update this section accordingly.

---

## 14) Author Information

**Author:** SoulHunter (NexHire AI Team)

- GitHub: https://github.com/1SoulHunter1
- Project: https://github.com/1SoulHunter1/nexhire-ai

---

## 15) Acknowledgment

Built as a hackathon prototype to demonstrate how AI-first UX can reimagine campus placement outcomes with transparency, intelligence, and governance.
