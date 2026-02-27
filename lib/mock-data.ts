export type StudentProfile = {
  id: string;
  fullName: string;
  email: string;
  university: string;
  degree: string;
  graduationYear: number;
  location: string;
  preferredRoles: string[];
  workPreference: "Remote" | "Hybrid" | "Onsite";
  portfolioUrl: string;
  linkedInUrl: string;
};

export type JobMatch = {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: "Full-time" | "Internship" | "Contract";
  workMode: "Remote" | "Hybrid" | "Onsite";
  salaryRangeLPA: string;
  postedDaysAgo: number;
  matchScore: number;
  matchedSkills: string[];
};

export type ReadinessBreakdown = {
  category: "Technical" | "Aptitude" | "Communication" | "Interview" | "Portfolio";
  score: number;
};

export type CareerReadiness = {
  overallScore: number;
  tier: "Developing" | "Competitive" | "Interview Ready";
  trend: "+" | "-" | "=";
  lastUpdated: string;
  breakdown: ReadinessBreakdown[];
};

export type SkillItem = {
  name: string;
  category: "Programming" | "Data" | "Cloud" | "Soft Skill" | "Framework";
  proficiency: "Beginner" | "Intermediate" | "Advanced";
  marketDemand: "Low" | "Medium" | "High";
  verified: boolean;
};

export type RecruiterStats = {
  activeRecruiters: number;
  openCampusRoles: number;
  avgResponseTimeHours: number;
  interviewInvitesThisMonth: number;
  profileViewsThisWeek: number;
  shortlistRate: number;
  offerConversionRate: number;
};

export type PlacementAnalytics = {
  academicYear: string;
  totalEligibleStudents: number;
  studentsPlaced: number;
  placementRate: number;
  averageCTCLPA: number;
  medianCTCLPA: number;
  monthlyPlacements: Array<{
    month: string;
    placed: number;
    offers: number;
  }>;
  topHiringSectors: Array<{
    sector: string;
    hires: number;
  }>;
};

export const studentProfileData: StudentProfile = {
  id: "stu_1042",
  fullName: "Aarav Kulkarni",
  email: "aarav.kulkarni@nexhire.ai",
  university: "Sahyadri College of Engineering",
  degree: "B.E. Computer Science",
  graduationYear: 2026,
  location: "Mangaluru, Karnataka",
  preferredRoles: ["Frontend Developer", "Data Analyst", "Product Engineer"],
  workPreference: "Hybrid",
  portfolioUrl: "https://aarav-dev-portfolio.vercel.app",
  linkedInUrl: "https://www.linkedin.com/in/aarav-kulkarni-1042",
};

export const jobsListData: JobMatch[] = [
  {
    id: "job_901",
    title: "Junior Frontend Engineer",
    company: "QuantEdge Labs",
    location: "Bengaluru",
    employmentType: "Full-time",
    workMode: "Hybrid",
    salaryRangeLPA: "8 - 11",
    postedDaysAgo: 2,
    matchScore: 92,
    matchedSkills: ["TypeScript", "React", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "job_902",
    title: "Product Analyst",
    company: "BlueOrbit AI",
    location: "Pune",
    employmentType: "Full-time",
    workMode: "Remote",
    salaryRangeLPA: "7 - 10",
    postedDaysAgo: 1,
    matchScore: 88,
    matchedSkills: ["SQL", "Python", "Data Visualization", "A/B Testing"],
  },
  {
    id: "job_903",
    title: "Software Engineer Intern",
    company: "NimbleStack",
    location: "Hyderabad",
    employmentType: "Internship",
    workMode: "Onsite",
    salaryRangeLPA: "4.5 - 6 (PPO track)",
    postedDaysAgo: 4,
    matchScore: 81,
    matchedSkills: ["JavaScript", "Node.js", "Git", "Problem Solving"],
  },
  {
    id: "job_904",
    title: "Data Associate",
    company: "Helio Fintech",
    location: "Chennai",
    employmentType: "Full-time",
    workMode: "Hybrid",
    salaryRangeLPA: "6 - 8",
    postedDaysAgo: 3,
    matchScore: 79,
    matchedSkills: ["Excel", "SQL", "Power BI", "Communication"],
  },
];

export const careerReadinessScoreData: CareerReadiness = {
  overallScore: 84,
  tier: "Interview Ready",
  trend: "+",
  lastUpdated: "2026-02-25",
  breakdown: [
    { category: "Technical", score: 86 },
    { category: "Aptitude", score: 80 },
    { category: "Communication", score: 82 },
    { category: "Interview", score: 78 },
    { category: "Portfolio", score: 91 },
  ],
};

export const skillsListData: SkillItem[] = [
  {
    name: "TypeScript",
    category: "Programming",
    proficiency: "Advanced",
    marketDemand: "High",
    verified: true,
  },
  {
    name: "React",
    category: "Framework",
    proficiency: "Advanced",
    marketDemand: "High",
    verified: true,
  },
  {
    name: "SQL",
    category: "Data",
    proficiency: "Intermediate",
    marketDemand: "High",
    verified: true,
  },
  {
    name: "Python",
    category: "Programming",
    proficiency: "Intermediate",
    marketDemand: "High",
    verified: true,
  },
  {
    name: "AWS Fundamentals",
    category: "Cloud",
    proficiency: "Beginner",
    marketDemand: "Medium",
    verified: false,
  },
  {
    name: "Stakeholder Communication",
    category: "Soft Skill",
    proficiency: "Intermediate",
    marketDemand: "High",
    verified: true,
  },
];

export const recruiterStatsData: RecruiterStats = {
  activeRecruiters: 42,
  openCampusRoles: 126,
  avgResponseTimeHours: 18,
  interviewInvitesThisMonth: 37,
  profileViewsThisWeek: 214,
  shortlistRate: 32,
  offerConversionRate: 19,
};

export const placementAnalyticsData: PlacementAnalytics = {
  academicYear: "2025-2026",
  totalEligibleStudents: 480,
  studentsPlaced: 346,
  placementRate: 72.1,
  averageCTCLPA: 8.4,
  medianCTCLPA: 7.2,
  monthlyPlacements: [
    { month: "Sep", placed: 28, offers: 36 },
    { month: "Oct", placed: 41, offers: 55 },
    { month: "Nov", placed: 52, offers: 68 },
    { month: "Dec", placed: 34, offers: 45 },
    { month: "Jan", placed: 76, offers: 93 },
    { month: "Feb", placed: 115, offers: 141 },
  ],
  topHiringSectors: [
    { sector: "SaaS", hires: 112 },
    { sector: "FinTech", hires: 83 },
    { sector: "E-commerce", hires: 61 },
    { sector: "IT Services", hires: 54 },
    { sector: "EdTech", hires: 36 },
  ],
};

export const mockNexHireData = {
  studentProfile: studentProfileData,
  jobsList: jobsListData,
  careerReadiness: careerReadinessScoreData,
  skillsList: skillsListData,
  recruiterStats: recruiterStatsData,
  placementAnalytics: placementAnalyticsData,
};
