// =========================================================
//  EDIT YOUR DETAILS HERE — the whole site reads from this file.
//  Wrap words in **double stars** to make them bold/white in paragraphs.
// =========================================================
export const site = {
  handle: "Rishita",              // script logo, top-left
  name: "Rishita",
  roles: ["Software Engineer", "Full-stack Developer", "Problem Solver", "exploring new ideas"], // typewriter line
  meta: "23, India",               // small grey line under the name

  email: "rishita2019@gmail.com",
  photo: "/photo.jpg",             // YOUR profile photo: put it in /public (square works best)
  banner: { dark: "/banner-dark.jpg", light: "/banner-light.jpg" },          // your banner image: put it in /public (or change this path)
  githubUser: "Rishita3710",     // used for the contribution graph (public profile)
  github: "https://github.com/Rishita3710",
  linkedin: "https://www.linkedin.com/in/about-rishita/",
  twitter: "https://x.com/i_m_rishita",
  resume: "/resume.pdf",           // put your PDF in /public as resume.pdf

  nav: [
    { label: "Home", to: "/" },
    { label: "Experience", to: "/experience" },
    { label: "Projects", to: "/projects" },
  ],
  talkLabel: "let's talk",

  primaryCta: { label: "View Projects", to: "/projects" },
  secondaryCta: { label: "View Resume", href: "/resume.pdf" },

  aboutTitle: "If you know me, you know...",
  about: [
    "I'm Rishita, a software engineer with a creative mindset and a strong eye for detail. I find inspiration in the little things, from art and cinematic visuals to the subtle design choices that make an experience stand out.",
    "I'm naturally curious and constantly exploring new ideas. Whenever I interact with a website or a digital product, I instinctively think about how its functionality, design, or user experience could be improved. I enjoy identifying problems, exploring possibilities, and transforming ideas into meaningful digital experiences.",
    "For me, software engineering is more than writing code. It's about combining creativity, curiosity, and problem-solving to build products that are intuitive, thoughtful, and enjoyable to use.",

  ],

  // name must exist in the ICONS map in src/components/TechStack.jsx.
  // cat = which filter tab it belongs to: "Frontend" | "Backend" | "Design" | "Tools"
  // (the hover sound is picked from the category + the position in this list)
  skills: [
    { name: "JavaScript", cat: "Frontend" },
    { name: "TypeScript", cat: "Frontend" },
    { name: "React", cat: "Frontend" },
    { name: "Next.js", cat: "Frontend" },
    { name: "Tailwind CSS", cat: "Frontend" },
    { name: "HTML5", cat: "Frontend" },
    { name: "CSS3", cat: "Frontend" },
    { name: "Redux", cat: "Frontend" },
    { name: "Framer Motion", cat: "Design" },
    { name: "Figma", cat: "Design" },
    { name: "Node.js", cat: "Backend" },
    { name: "Express.js", cat: "Backend" },
    { name: "MongoDB", cat: "Backend" },
    { name: "PostgreSQL", cat: "Backend" },
    { name: "JWT", cat: "Backend" },
    { name: "Git", cat: "Tools" },
    { name: "GitHub", cat: "Tools" },
    { name: "Vercel", cat: "Tools" },
    { name: "Docker", cat: "Tools" },
    { name: "Postman", cat: "Tools" },
    { name: "Axios", cat: "Tools" },
  ],

  ctaLines: ["Have an idea?", "Let's build something together."], // big line above the footer

  freelanceTitle: "Freelancing",
  freelance: [
    "Open to exciting projects, creative collaborations, and new opportunities. I help bring digital ideas to life by building responsive websites, developing interactive interfaces, and creating solutions tailored to unique project needs. Every project is an opportunity to learn, innovate, and deliver something valuable.",
  ],

  projects: [
    {
      title: "Jobmate",
      description: "JobMate is a Chrome Extension and web application that simplifies job hunting by automating application forms, saving job opportunities, tracking applications, and providing AI-powered skill matching.",
      tags: ["React", "Node.js", "JavaScript", "Chrome Extension API", "Tailwind CSS", "Express.js", "PostgreSQL"],
      status: "ongoing",
      code: "https://github.com/Rishita3710/jobmate/tree/main/backend",
    },
    {
      title: "TaskFlow",
      description: "TaskFlow is a full-stack team collaboration platform that streamlines task management with role-based access, real-time discussions, and a centralized record of team decisions.",
      tags: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "socket.io", "Node.js"],
      status: "live",
      live: "https://taskflow-platform-a6c2.onrender.com/login",
      code: "https://github.com/Rishita3710/taskflow-platform",
    },
    {
      title: "VandeIOT",
      description: "Built an IoT-based smart monitoring system using ESP32 and MongoDB, enabling real-time sensor tracking with REST API integration and dynamic React dashboard visualization.",
      tags: ["React", "Express", "MongoDB"],
      status: "live",
      live: "https://vandeiot.in/",
    },
  ],
  // Experience page: newest first
  experience: [
    {
      role: "Software Engineer", company: "Nutan Technologies", period: "2025 - Present", points: [
        "Developed and maintained full-stack web applications using React.js, Node.js, and MongoDB, improving application performance and user experience.",
        "Built responsive and user-friendly UI components following modern design principles.",
        "Implemented form validation, authentication, and database integration for secure user management.",
        "Deployed applications and managed version control using Git and GitHub.",
      ]
    },
    {
      role: "Web Developer", company: "Manav Rachna Innovation and Incubation Center", period: "2025 - 2025", points: [
        "Designed and developed responsive web applications using React.js with reusable component-based architecture.",
        "Implemented state management and dynamic UI rendering to build scalable frontend applications.",
        "Built mobile-responsive, cross-browser compatible applications using Bootstrap.",
        "Worked in an Agile environment using Git for version control, debugging, and performance optimization.",
      ]
    },
  ],
};
