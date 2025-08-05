import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { Skills } from './components/Skills';
import { KeyAchievements } from './components/KeyAchievements';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { PersonalProjects } from './components/PersonalProjects';
import { Courses } from './components/Courses';
import { Footer } from './components/Footer';

// Data for Header
const headerData = {
  name: 'MARCIN PARDA',
  title: 'Senior Frontend Developer with Python',
  phone: '+48 576 259 548',
  email: 'marcin98parda@gmail.com',
  linkedin: 'www.linkedin.com/in/marcinparda/',
  location: 'Warsaw, Poland',
};

// Data for Summary
const summaryData = [
  'Specialist with over 5 years of experience, including over 1.5 years as a senior developer. Acting as a code mentor and technical recruiter. Regular frontend and seasoned speaker at IT meetings and blogger. Active participant in events such as Advent of Code and hackathons. More about me: https://www.parda.me/work',
  '(CV has more than one page, please scroll)',
];

// Data for Skills
const skills = [
  'React',
  'Typescript',
  'Nx',
  'AI agents / MCP',
  'Vitest / Cypress / Jest',
  'Next.js',
  'Vue / Astro / Angular',
  'FastAPI',
  'Python',
  'Postgres',
  'Redis',
  'Docker',
  'SQLAlchemy',
  'express.js',
  'English B2',
  'Polish Native',
];

// Data for Achievements
const achievements = [
  {
    title: 'Helped excels carrier of my mentees and mine',
    description:
      'I mentored several colleagues who consistently excelled and received promotions. My own achievements led to a rapid promotion from "early senior" to a higher position within a year.',
  },
  {
    title: 'Delivering with cut budget',
    description:
      'As sole developer, I reduced development time from six to four months. We delivered a minimalistic product, and the client returned with more budget for further work.',
  },
  {
    title: 'Awarded "SPOT award" bonus',
    description:
      'I led a side project automating CV updates, saving 0.5 hours monthly for each of over 100 employees.',
  },
  {
    title: 'Great feedbacks',
    description:
      "I've received great feedback for quickly contributing to projects and improving software delivery processes.",
  },
];

// Data for Experience
const experienceData = [
  {
    title: 'Senior Developer',
    company: 'EY GDS',
    details: 'Consulting company, BIG4',
    date: '11/2023 - Present',
    location: 'Warsaw, Poland',
    description: [
      'Successfully led a team developing internal applications; handled requirements gathering with managers, authored user stories, assigned tasks, set priorities for architecture and complex feature development, and facilitated a smooth project handover to management.',
      'Spearheaded the migration from a broken microfrontend solution to a monorepo architecture for five projects, enabling easier code sharing, simplifying new project creation, and reducing deployment times from ~40min to ~10min.',
      'Orchestrated migration initiatives from legacy frameworks and infrastructure. Delivered React upgrade and a full UI overhaul across all pages, both delivered on schedule and resulting in zero major bugs or design inconsistencies.',
      'Created and maintained a detailed frontend developer competence matrix, accelerating the on-boarding and learning skills assessment for employees using a technical problem-solving skills.',
      'Orchestrated regular DevOps automation initiatives including developing and implementing CI/CD best practices to all staff.',
      'Coordinated knowledge-sharing meetings within the frontend/design department, fostering learning and best practices across teams by participating in industry events and community.',
      'Contributed to multiple proof-of-concept projects, including an AI RAG-based chatbot (web components + Flask) designed for easy integration into other solutions.',
      'Built and maintained design component libraries using Storybook for two key projects, improving UI consistency, docs and reusability.',
      'Resolved a persistent login issue by forking and updating the MSAL library, ensuring stable authentication for end users.',
      'Gained valuable insights and work-ethics lessons about documentation, testing, code reviews, and sprint refinement through close collaboration with an experienced tech lead, leading to more accurate task estimation and flawless sprint goal delivery.',
    ],
  },
  {
    title: 'Javascript Developer',
    company: 'STX Next (continuation of work at Ermlab Software)',
    details: 'AI Python software house',
    date: '04/2022 - 11/2023',
    location: 'Olsztyn, Poland',
    description: [
      "Increased the employment of several people from our company at the client's site, thanks to successfully delivering a project from initial workshops with the client to a functional Minimum Viable Product (MVP).",
      'Speeded up internal screens of internal applications from ~5s to less than 0.5s via refactor.',
      'Planned frontend architecture multiple times, selecting appropriate tools and libraries for new projects.',
      'Learned a Python extension development and created a MVP of an extension project before estimated time.',
      'Developed a mobile application for vets and patients.',
      'Implemented integration systems.',
      'Provided assistance and guidance to other Team members.',
      'Participated in additional activities such as AI hackathons (manage to won!), Tech Talks, and Meetups.',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Ermlab Software',
    details: 'AI Python software house',
    date: '07/2020 - 03/2022',
    location: 'Olsztyn, Poland',
    description: [
      'Worked on developing and maintaining frontend projects in React and Angular technologies.',
      'Created complex multistep forms, web applications with facebook auth.',
      'Created data visualization for AI scientific research.',
      'Co-created Google Chrome extension.',
      'Technically supervising learning meetings and leading several of them.',
    ],
  },
];

// Data for Education
const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    university: 'University of Warmia and Mazury in Olsztyn',
    years: '2017 - 2021',
  },
];

// Data for Personal Projects
const personalProjectsData = [
  {
    name: 'Blog',
    liveUrl: 'https://www.parda.me/blog',
    code: 'Blog',
    date: '03/2023 - Present',
    location: 'Remote',
    description: [
      'Technical blog where I write about web development topics.',
      'Primarily cover front-end development, but I also cover topics related to working as a developer.',
      'Trying to keep them short but understandable, using real-life scenarios for better understanding.',
      'Trying to write posts monthly.',
    ],
  },
  {
    name: 'Cockpit',
    liveUrl: 'https://www.cockpit.parda.me',
    code: 'Cockpit Backend & Cockpit Frontend',
    date: '03/2023 - Present',
    location: 'Remote',
    description: [
      'Cockpit project consists of several apps that help boost my productivity and overall quality of life, such as managing my budget and',
      'assisting with newsletters.',
      'FastAPI backend for frontend applications. Using Postgres, SQLAlchemy, Pydantic.',
      'NX monorepo for my frontend applications. Using React, Angular, Vue, OpenAPI types generation, tailwindcss, vitest.',
      'Docker & Raspberry Pi Deployment',
    ],
  },
];

// Data for Courses
const coursesData = [
  'Microsoft Certified: Azure AI Fundamentals',
  'Microsoft Certified: Azure Fundamentals',
  'AI Devs 2 & 3 - AI integration and building agents',
  'Modern Frontend - Next.js, React, GraphQL and Typescript',
  'Architecture on Frontend (Architektura na Froncie)',
];

export function CV() {
  return (
    <div className="max-w-4xl mx-auto p-8 print:p-2 print:max-w-none bg-white print:bg-white print:m-0">
      <Header {...headerData} />
      <Summary summary={summaryData} />
      <Skills skills={skills} />
      <KeyAchievements achievements={achievements} />
      <Experience experience={experienceData} />
      <Education education={educationData} />
      <PersonalProjects projects={personalProjectsData} />
      <Courses courses={coursesData} />
      <Footer />
    </div>
  );
}
