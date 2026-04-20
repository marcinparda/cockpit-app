interface UnsavedChangesDialogProps {
  isOpen: boolean;
  targetPresetLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function UnsavedChangesDialog({
  isOpen,
  targetPresetLabel,
  onConfirm,
  onCancel,
}: UnsavedChangesDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-slate-800">Unsaved changes</h2>
        <p className="mt-2 text-sm text-slate-600">
          You have unsaved changes. Switching to{' '}
          <span className="font-medium text-slate-800">{targetPresetLabel}</span> will discard
          them.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Stay here
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg border border-red-600 bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Discard changes
          </button>
        </div>
      </div>
    </div>
  );
}
