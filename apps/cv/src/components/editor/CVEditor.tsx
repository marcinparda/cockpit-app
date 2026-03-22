import { Panel, Group, Separator } from 'react-resizable-panels';
import { useCVData } from '../../hooks/useCVData';
import { CVPreview } from './CVPreview';
import { CVEditorPanel } from './CVEditorPanel';
import { GripVertical } from 'lucide-react';

export function CVEditor() {
  const { cvData, setCVData, resetToDefault, isLoading } = useCVData();

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-slate-50">
      <Group orientation="horizontal">
        <Panel defaultSize={50} minSize={30} className="print:hidden">
          <CVEditorPanel
            cvData={cvData}
            setCVData={setCVData}
            resetToDefault={resetToDefault}
          />
        </Panel>
        <Separator className="group relative w-2 bg-slate-200 transition-colors hover:bg-blue-400 print:hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 p-1 opacity-0 transition-opacity group-hover:opacity-100">
            <GripVertical className="h-4 w-4 text-slate-600" />
          </div>
        </Separator>
        <Panel defaultSize={50} minSize={30} className="print:w-full">
          <CVPreview cvData={cvData} />
        </Panel>
      </Group>
    </div>
  );
}
