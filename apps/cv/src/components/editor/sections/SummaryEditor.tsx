import { Plus, Trash2 } from 'lucide-react';
import { CVData } from '../../../types/cv.types';

interface SummaryEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

export function SummaryEditor({ cvData, setCVData }: SummaryEditorProps) {
  function updateParagraph(index: number, value: string) {
    const newSummary = [...cvData.summary];
    newSummary[index] = value;
    setCVData({ ...cvData, summary: newSummary });
  }

  function addParagraph() {
    setCVData({ ...cvData, summary: [...cvData.summary, ''] });
  }

  function removeParagraph(index: number) {
    const newSummary = cvData.summary.filter((_, i) => i !== index);
    setCVData({ ...cvData, summary: newSummary });
  }

  return (
    <div className="space-y-4">
      {cvData.summary.map((paragraph, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">
              Paragraph {index + 1}
            </label>
            <button
              onClick={() => removeParagraph(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <textarea
            value={paragraph}
            onChange={(e) => updateParagraph(index, e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      ))}
      <button
        onClick={addParagraph}
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Plus className="h-4 w-4" />
        Add Paragraph
      </button>
    </div>
  );
}
