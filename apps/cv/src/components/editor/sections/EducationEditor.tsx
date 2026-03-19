import { Plus, Trash2 } from 'lucide-react';
import { CVData, Education } from '../../../types/cv.types';

interface EducationEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

export function EducationEditor({ cvData, setCVData }: EducationEditorProps) {
  function updateEducation(
    index: number,
    field: keyof Education,
    value: string
  ) {
    const newEducation = [...cvData.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    setCVData({ ...cvData, education: newEducation });
  }

  function addEducation() {
    setCVData({
      ...cvData,
      education: [
        ...cvData.education,
        { degree: '', university: '', years: '' },
      ],
    });
  }

  function removeEducation(index: number) {
    const newEducation = cvData.education.filter((_, i) => i !== index);
    setCVData({ ...cvData, education: newEducation });
  }

  return (
    <div className="space-y-4">
      {cvData.education.map((edu, index) => (
        <div
          key={index}
          className="space-y-3 rounded-lg border border-slate-300 bg-white p-4"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-slate-700">
              Education {index + 1}
            </h3>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Degree
            </label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              University
            </label>
            <input
              type="text"
              value={edu.university}
              onChange={(e) =>
                updateEducation(index, 'university', e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Years
            </label>
            <input
              type="text"
              value={edu.years}
              onChange={(e) => updateEducation(index, 'years', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add Education
      </button>
    </div>
  );
}
