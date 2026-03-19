import { useRef } from 'react';
import { Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { CVData } from '../../types/cv.types';
import { Header } from '../cv/components/Header';
import { Summary } from '../cv/components/Summary';
import { Skills } from '../cv/components/Skills';
import { KeyAchievements } from '../cv/components/KeyAchievements';
import { Experience } from '../cv/components/Experience';
import { Education } from '../cv/components/Education';
import { PersonalProjects } from '../cv/components/PersonalProjects';
import { Courses } from '../cv/components/Courses';
import { Footer } from '../cv/components/Footer';

interface CVPreviewProps {
  cvData: CVData;
}

export function CVPreview({ cvData }: CVPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: 'CV',
  });

  return (
    <div className="relative h-screen overflow-y-auto bg-slate-100">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-300 bg-white px-6 py-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Preview</h2>
        <button
          onClick={() => handlePrint()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Export PDF
        </button>
      </div>
      <div className="flex justify-center bg-white p-8">
        <div
          id="cv-preview-content"
          ref={previewRef}
          className="mx-auto w-full max-w-4xl bg-white"
        >
          <Header headerData={cvData.header} />
          <Summary summary={cvData.summary} />
          <Skills skills={cvData.skills} />
          <KeyAchievements achievements={cvData.achievements} />
          <Experience experience={cvData.experience} />
          <Education education={cvData.education} />
          <PersonalProjects projects={cvData.personalProjects} />
          <Courses courses={cvData.courses} />
          <Footer />
        </div>
      </div>
    </div>
  );
}
