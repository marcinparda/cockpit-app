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
      'I mentored several colleagues, building strong professional relationships with each of them. My mentees consistently excelled in their roles and received promotions year after year. I also achieved significant personal growth during my tenure - I initially joined the company as an "early senior" due to my lack experience, but thanks to my accomplishments both within and beyond project work, I earned a promotion to a higher position in less than a year.',
  },
  {
    title: 'Delivering with cut budget',
    description:
      'In a project where I served as the sole developer, I was able to reduce the application development time from six months to four. Together with the client, we prioritized essential features and eliminated solutions that would accelerate the development process. Through close collaboration and focused effort, we successfully delivered a minimalistic product, and the client subsequently returned with an additional budget for further development.',
  },
  {
    title: 'Great feedbacks',
    description:
      "So far, I've received mostly great feedback on my work - especially regarding the speed with which I can start contributing to projects and the appreciation for my efforts to improve software delivery processes.",
  },
  {
    title: 'Awarded "SPOT award" bonus',
    description:
      "For quickly implementing and leading a side project automating the company's CV updating process, saving approximately 9.5 hours per month for over 100 employees.",
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
