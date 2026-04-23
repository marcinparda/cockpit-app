import { CVData } from '../../../types/cv.types';

interface HeaderEditorProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
}

export function HeaderEditor({ cvData, setCVData }: HeaderEditorProps) {
  function updateField(field: keyof CVData['header'], value: string) {
    setCVData({
      ...cvData,
      header: {
        ...cvData.header,
        [field]: value,
      },
    });
  }

  function updateLinkedin(field: 'url' | 'text', value: string) {
    setCVData({
      ...cvData,
      header: {
        ...cvData.header,
        linkedin: {
          ...cvData.header.linkedin,
          [field]: value,
        },
      },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          type="text"
          value={cvData.header.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          type="text"
          value={cvData.header.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Phone
        </label>
        <input
          type="text"
          value={cvData.header.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          type="email"
          value={cvData.header.email}
          onChange={(e) => updateField('email', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          LinkedIn URL
        </label>
        <input
          type="text"
          value={cvData.header.linkedin?.url || ''}
          onChange={(e) => updateLinkedin('url', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          LinkedIn Display Text
        </label>
        <input
          type="text"
          value={cvData.header.linkedin?.text || ''}
          onChange={(e) => updateLinkedin('text', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Location
        </label>
        <input
          type="text"
          value={cvData.header.location}
          onChange={(e) => updateField('location', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>
    </div>
  );
}
