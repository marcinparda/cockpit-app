import { useState } from 'react';
import { RotateCcw, Save } from 'lucide-react';
import { CVData } from '../../types/cv.types';
import { SectionKey, Preset } from '../../types/preset.types';
import { PresetDropdown } from '../PresetDropdown';
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
  saveToApi: () => void;
  isSaving: boolean;
  markDirty: (section: SectionKey) => void;
  presets: Preset[];
  selectedPresetId: string;
  isDirty: boolean;
  onSelectPreset: (id: string) => void;
  onCreatePreset: () => void;
  onArchivePreset: (id: string) => void;
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
  saveToApi,
  isSaving,
  markDirty,
  presets,
  selectedPresetId,
  isDirty,
  onSelectPreset,
  onCreatePreset,
  onArchivePreset,
}: CVEditorPanelProps) {
  function sectionSetter(section: SectionKey) {
    return (data: CVData) => {
      setCVData(data);
      markDirty(section);
    };
  }
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
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-slate-800">CV Editor</h2>
            <PresetDropdown
              presets={presets}
              selectedPresetId={selectedPresetId}
              isDirty={isDirty}
              onSelect={onSelectPreset}
              onCreateNew={onCreatePreset}
              onArchive={onArchivePreset}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={saveToApi}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={resetToDefault}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
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
          <HeaderEditor cvData={cvData} setCVData={sectionSetter('header')} />
        )}
        {activeTab === 'summary' && (
          <SummaryEditor cvData={cvData} setCVData={sectionSetter('summary')} />
        )}
        {activeTab === 'skills' && (
          <SkillsEditor cvData={cvData} setCVData={sectionSetter('skills')} />
        )}
        {activeTab === 'achievements' && (
          <AchievementsEditor cvData={cvData} setCVData={sectionSetter('achievements')} />
        )}
        {activeTab === 'experience' && (
          <ExperienceEditor cvData={cvData} setCVData={sectionSetter('experience')} />
        )}
        {activeTab === 'education' && (
          <EducationEditor cvData={cvData} setCVData={sectionSetter('education')} />
        )}
        {activeTab === 'projects' && (
          <PersonalProjectsEditor cvData={cvData} setCVData={sectionSetter('projects')} />
        )}
        {activeTab === 'courses' && (
          <CoursesEditor cvData={cvData} setCVData={sectionSetter('courses')} />
        )}
      </div>
    </div>
  );
}
