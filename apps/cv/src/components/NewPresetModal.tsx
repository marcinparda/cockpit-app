import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { generateSlug } from '../utils/slug';

interface NewPresetModalProps {
  isOpen: boolean;
  existingSlugs: string[];
  onClose: () => void;
  onConfirm: (label: string, description?: string) => Promise<void>;
}

export function NewPresetModal({
  isOpen,
  existingSlugs,
  onClose,
  onConfirm,
}: NewPresetModalProps) {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setLabel('');
      setDescription('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const slug = generateSlug(label);
  const slugCollides = slug.length > 0 && existingSlugs.includes(slug);

  function handleClose() {
    if (isSubmitting) return;
    onClose();
  }

  async function handleConfirm() {
    if (!label.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onConfirm(label, description || undefined);
      setLabel('');
      setDescription('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">New Preset</h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="preset-label"
              className="block text-sm font-medium text-slate-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="preset-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Senior Frontend"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
            />

            {/* Slug preview */}
            {label.trim().length > 0 && (
              <p className="text-xs text-slate-500">
                Will be saved as:{' '}
                <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-slate-700">
                  {slug}
                </code>
              </p>
            )}

            {/* Collision warning */}
            {slugCollides && (
              <p className="text-xs text-amber-600">
                A preset with this ID already exists — a suffix will be added automatically.
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="preset-description"
              className="block text-sm font-medium text-slate-700"
            >
              Description{' '}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              id="preset-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of this preset…"
              rows={3}
              disabled={isSubmitting}
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!label.trim() || isSubmitting}
            className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating…' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
