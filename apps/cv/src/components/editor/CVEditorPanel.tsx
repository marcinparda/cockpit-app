import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { CVData } from '../../types/cv.types';
import { HeaderEditor } from './sections/HeaderEditor';
import { SummaryEditor } from './sections/SummaryEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { AchievementsEditor } from './sections/AchievementsEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { EducationEditor } from './sections/EducationEditor';
import { PersonalProjectsEditor } from './sections/PersonalProjectsEditor';
import { CoursesEditor } from './sections/CoursesEditor';

interface CVEditorPanelProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
  resetToDefault: () => void;
}

type Tab =
  | 'header'
  | 'summary'
  | 'skills'
  | 'achievements'
  | 'experience'
  | 'education'
  | 'projects'
  | 'courses';

export function CVEditorPanel({
  cvData,
  setCVData,
  resetToDefault,
}: CVEditorPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('header');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'header', label: 'Header' },
    { id: 'summary', label: 'Summary' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'courses', label: 'Courses' },
  ];

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">CV Editor</h2>
          <button
            onClick={resetToDefault}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'header' && (
          <HeaderEditor cvData={cvData} setCVData={setCVData} />
        )}
        {activeTab === 'summary' && (
          <SummaryEditor cvData={cvData} setCVData={setCVData} />
        )}
        {activeTab === 'skills' && (
          <SkillsEditor cvData={cvData} setCVData={setCVData} />
        )}
        {activeTab === 'achievements' && (
          <AchievementsEditor cvData={cvData} setCVData={setCVData} />
        )}
        {activeTab === 'experience' && (
          <ExperienceEditor cvData={cvData} setCVData={setCVData} />
        )}
        {activeTab === 'education' && (
          <EducationEditor cvData={cvData} setCVData={setCVData} />
        )}
        {activeTab === 'projects' && (
          <PersonalProjectsEditor cvData={cvData} setCVData={setCVData} />
        )}
        {activeTab === 'courses' && (
          <CoursesEditor cvData={cvData} setCVData={setCVData} />
        )}
      </div>
    </div>
  );
}
