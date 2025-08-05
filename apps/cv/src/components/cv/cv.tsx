import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { Skills } from './components/Skills';
import { KeyAchievements } from './components/KeyAchievements';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { PersonalProjects } from './components/PersonalProjects';
import { Courses } from './components/Courses';
import { Footer } from './components/Footer';

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

export function CV() {
  return (
    <div className="max-w-4xl mx-auto p-8 print:p-2 print:max-w-none bg-white print:bg-white print:m-0">
      <Header />
      <Summary />
      <Skills skills={skills} />
      <KeyAchievements achievements={achievements} />
      <Experience />
      <Education />
      <PersonalProjects />
      <Courses />
      <Footer />
    </div>
  );
}
