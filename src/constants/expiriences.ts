type ExperienceItem = {
  role: string;
  impact: string;
  period: string;
  initials: string;
  logo: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Full Stack Engineer at zennit",
    impact: "SaaS infrastructure, auth, CI/CD, mobile",
    period: "Jan 2024 – Present",
    initials: "Z",
    logo: "/zennit.png",
  },
  {
    role: "Backend Developer at Hire A Loo",
    impact: "Laravel APIs, full-text search, legacy migration",
    period: "Aug 2025 – Feb 2026",
    initials: "HL",
    logo: "/hirealoo.webp",
  },
  {
    role: "Full Stack Developer at Clickservice GmbH",
    impact: "Django backend, React frontend, workforce platform",
    period: "Jan 2023 – Jan 2024",
    initials: "CS",
    logo: "/clickservice.png",
  },
  {
    role: "Mobile Developer at Vodafone Albania",
    impact: "React Native iOS & Android, real-time features",
    period: "Jan 2022 – Dec 2022",
    initials: "V",
    logo: "/vodafone.png",
  },
];
