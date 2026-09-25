export const defaultGreeting = 
  "Hi! I'm Shalini's AI Assistant. Ask me anything about her Java Spring Boot services, React frontends, education, or featured projects!";

export const suggestedPrompts = [
  "What is Shalini's core tech stack?",
  "Tell me about her education and academic scores",
  "Tell me about her internship experience",
  "Tell me about the SmartVote Bharat project",
  "Explain the APEX TRUST Banking project",
  "How can I download Shalini's official resume?",
];

export const aiKnowledgeBase = [
  {
    keywords: ["education", "college", "university", "school", "btech", "degree", "cgpa", "score", "percentage", "studies"],
    reply: "Shalini is pursuing her **B-Tech in Computer Science and Engineering** at **Bharath Institute of Higher Education And Research University (2022-2026)** with an outstanding **91.4%**. Prior to university, she secured **94.9%** in MPC Intermediate from Sri Vidwan Junior College (Warangal) and **95%** in 10th SSC from T.S Model School (Mahabubabad).",
  },
  {
    keywords: ["internship", "experience", "work", "talent lad", "codesoft", "company"],
    reply: "Shalini completed two impactful internships:\n1. **Java Full Stack & Spring Boot Development Intern** at **Talent Lad (AICTE)** (Jan 2025 – May 2025): Developed backend services with Spring Boot, built RESTful APIs, and integrated MySQL.\n2. **Web Development Intern (Frontend)** at **Codesoft Company** (Oct 2024 – Nov 2024): Built responsive UI components and worked across the software development lifecycle.",
  },
  {
    keywords: ["vote", "voting", "smartvote", "election", "ballot", "facial", "biometric", "article 324", "eci"],
    reply: "**SmartVote Bharat (SmartVote-AI)** is a sovereign national digital e-voting infrastructure designed in strict compliance with Article 324 of the Constitution of India. Built with **Spring Boot 3.3**, **React 18**, and **Vite**, it features AI-powered real-time facial verification & liveness detection, immutable SHA-256 cryptographic ballot sealing, digital voter slip generation, and dual-layer EC/Returning Officer audit consoles.",
  },
  {
    keywords: ["stack", "skills", "tech", "technologies", "languages", "tools"],
    reply: "Shalini specializes in **Java**, **Spring Boot**, **Hibernate ORM**, **REST APIs**, **MySQL**, and **OOP Principles** on the backend, alongside modern **React.js**, **JavaScript**, **HTML5/CSS3**, and **Bootstrap** on the frontend. She is also skilled in **Python**, **SQL**, **Data Structures & Algorithms**, and tools like **Git**, **GitHub**, **VS Code**, and **IntelliJ**.",
  },
  {
    keywords: ["job bot", "application bot", "playwright", "ollama", "resume bot"],
    reply: "The **AI Job Application Bot** is an autonomous agent combining **Spring Boot**, **React**, **Playwright**, and **Ollama**. It parses resumes, contextually answers bespoke employer screening questions via local LLMs without token costs, and handles automated submissions at 10x speed with 99.4% form accuracy.",
  },
  {
    keywords: ["drowsiness", "driver", "opencv", "dlib", "deepface", "vision", "fatigue"],
    reply: "The **Driver Drowsiness Detection** system processes live video streams at 30+ FPS using **Python**, **OpenCV**, and **Dlib 68-point facial landmarks**. By calculating Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) in real-time, it triggers instant acoustic alarms to save lives on the road.",
  },
  {
    keywords: ["banking", "bank", "apex", "trust", "ledger", "financial", "security", "jwt", "rbac", "angular", "tidb"],
    reply: "**APEX TRUST** is an enterprise-grade core banking platform built with **Spring Boot 3 (Java 21)**, **Angular 19**, and **TiDB Serverless** on Render. It features 4-tier Role-Based Access Control (Admin, Branch Manager, Teller, Customer), stateless JWT security, real-time transaction & ledger engine, and an interactive holographic account verification vault widget.",
  },
  {
    keywords: ["certifications", "certificate", "nptel", "samsung", "coursera", "eduskills"],
    reply: "Shalini holds prestigious certifications including **NPTEL Big Data Analytics**, **Samsung Innovation Certificate (NSIC/Coding and Programming)**, **Full Stack Java Development (Talent Lad)**, **Machine Learning Using Python (Coursera)**, **Data Structures & Algorithms (Coursera)**, and **Google AI/ML Certificate (EduSkills)**.",
  },
  {
    keywords: ["spring", "java", "backend", "microservices", "hibernate"],
    reply: "Shalini possesses strong expertise in enterprise **Java**, **Spring Boot**, **Spring Security**, **Hibernate/JPA**, and relational **MySQL** schema architecture. She designs stateless, resilient REST APIs and microservices with clean code and sub-second response times.",
  },
  {
    keywords: ["react", "frontend", "ui", "design", "framer"],
    reply: "On the frontend, Shalini creates modern, high-performance interfaces using **React.js**, **Tailwind CSS**, and modern component patterns, focusing on smooth responsiveness and intuitive user journeys.",
  },
  {
    keywords: ["contact", "email", "hire", "interview", "resume", "reach", "phone"],
    reply: "You can reach Shalini directly via email at **shalinithummanapally@gmail.com**, phone at **+91 9391585557**, or download her official resume directly from the top navigation bar or hero section!",
  },
];

export function getAIResponse(userMessage) {
  const query = userMessage.toLowerCase().trim();
  
  for (const entry of aiKnowledgeBase) {
    if (entry.keywords.some((kw) => query.includes(kw))) {
      return entry.reply;
    }
  }

  return `Thanks for asking! Shalini is a talented engineer with strong expertise across Java Spring Boot, full-stack web development, and database engineering. Feel free to explore her featured projects above or reach out to her directly at **shalinithummanapally@gmail.com**! You can also download her official resume directly via the Resume buttons.`;
}
