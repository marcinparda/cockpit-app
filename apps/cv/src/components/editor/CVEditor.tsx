import { useState } from 'react';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';
import { useCVData } from '../../hooks/useCVData';
import { usePresets } from '../../hooks/usePresets';
import { CVPreview } from './CVPreview';
import { CVEditorPanel } from './CVEditorPanel';
import { NewPresetModal } from '../NewPresetModal';
import { UnsavedChangesDialog } from '../UnsavedChangesDialog';
import { Preset } from '../../types/preset.types';

export function CVEditor() {
  const {
    presets,
    selectedPresetId,
    isLoading: presetsLoading,
    selectPreset,
    createPreset,
    archivePreset,
  } = usePresets();

  const { cvData, setCVData, resetToDefault, saveToApi, isSaving, isLoading, markDirty, isDirty, clearDirty } =
    useCVData(selectedPresetId);

  const [pendingPresetId, setPendingPresetId] = useState<string | null>(null);
  const [isUnsavedDialogOpen, setIsUnsavedDialogOpen] = useState(false);
  const [isNewPresetModalOpen, setIsNewPresetModalOpen] = useState(false);

  function handleSelectPreset(id: string) {
    if (isDirty) {
      setPendingPresetId(id);
      setIsUnsavedDialogOpen(true);
    } else {
      selectPreset(id);
    }
  }

  function handleDiscardAndSwitch() {
    if (pendingPresetId) {
      clearDirty();
      selectPreset(pendingPresetId);
    }
    setPendingPresetId(null);
    setIsUnsavedDialogOpen(false);
  }

  function handleCancelSwitch() {
    setPendingPresetId(null);
    setIsUnsavedDialogOpen(false);
  }

  async function handleCreatePreset(label: string, description?: string) {
    const newPreset: Preset = await createPreset(label, description);
    selectPreset(newPreset.id);
    setIsNewPresetModalOpen(false);
  }

  const pendingPresetLabel =
    pendingPresetId === 'base'
      ? 'Base'
      : (presets.find((p) => p.id === pendingPresetId)?.label ?? pendingPresetId ?? '');

  if (isLoading || presetsLoading) {
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
            saveToApi={saveToApi}
            isSaving={isSaving}
            markDirty={markDirty}
            presets={presets}
            selectedPresetId={selectedPresetId}
            isDirty={isDirty}
            onSelectPreset={handleSelectPreset}
            onCreatePreset={() => setIsNewPresetModalOpen(true)}
            onArchivePreset={archivePreset}
          />
        </Panel>
        <Separator className="group relative w-2 bg-slate-200 transition-colors hover:bg-blue-400 print:hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 p-1 opacity-0 transition-opacity group-hover:opacity-100">
            <GripVertical className="h-4 w-4 text-slate-600" />
          </div>
        </Separator>
        <Panel defaultSize={50} minSize={30} className="print:w-full">
          <CVPreview cvData={cvData} presetId={selectedPresetId} />
        </Panel>
      </Group>

      <UnsavedChangesDialog
        isOpen={isUnsavedDialogOpen}
        targetPresetLabel={pendingPresetLabel}
        onConfirm={handleDiscardAndSwitch}
        onCancel={handleCancelSwitch}
      />

      <NewPresetModal
        isOpen={isNewPresetModalOpen}
        existingSlugs={presets.map((p) => p.id)}
        onClose={() => setIsNewPresetModalOpen(false)}
        onConfirm={handleCreatePreset}
      />
    </div>
  );
}
