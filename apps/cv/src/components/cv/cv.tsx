import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { Skills } from './components/Skills';
import { KeyAchievements } from './components/KeyAchievements';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { PersonalProjects } from './components/PersonalProjects';
import { Courses } from './components/Courses';
import { Footer } from './components/Footer';
import {
  headerData,
  summaryData,
  skillsData,
  achievementsData,
  experienceData,
  educationData,
  personalProjectsData,
  coursesData,
} from '../../data/cvData';

export function CV() {
  return (
    <div className="mx-auto max-w-4xl bg-white p-8 print:m-0 print:max-w-none print:bg-white print:p-2">
      <Header headerData={headerData} />
      <Summary summary={summaryData} />
      <Skills skills={skillsData} />
      <KeyAchievements achievements={achievementsData} />
      <Experience experience={experienceData} />
      <Education education={educationData} />
      <PersonalProjects projects={personalProjectsData} />
      <Courses courses={coursesData} />
      <Footer />
    </div>
  );
}
