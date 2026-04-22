import { ConfirmPayload } from '../hooks/useStreamingChat';

interface Props {
  payload: ConfirmPayload;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

export function ConfirmCard({ payload, onConfirm, onCancel, disabled }: Props) {
  const sections = Object.keys(payload.preview);

  return (
    <div className="mx-4 my-2 border border-indigo-500/40 bg-slate-800/60 rounded-xl p-4 text-sm">
      <p className="text-indigo-300 font-medium mb-1">Ready to save preset</p>
      <p className="text-slate-300 mb-3">
        <span className="font-semibold text-white">{payload.preset_name}</span>
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {sections.map((s) => (
          <span key={s} className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs">
            {s}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          disabled={disabled}
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
        >
          Confirm & save
        </button>
        <button
          onClick={onCancel}
          disabled={disabled}
          className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-300 text-xs font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
