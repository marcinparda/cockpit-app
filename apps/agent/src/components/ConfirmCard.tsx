import { useState } from 'react';
import { ConfirmPayload } from '../hooks/useStreamingChat';
import { CheckIcon, ChevronIcon, DocIcon, SparkleIcon } from './Icons';

interface Props {
  payload: ConfirmPayload;
  onConfirm: () => void;
  onCancel: () => void;
  disabled?: boolean;
}

interface SectionProps {
  open: boolean;
  onToggle: () => void;
  label: string;
  count: string;
  children: React.ReactNode;
}

function Section({ open, onToggle, label, count, children }: SectionProps) {
  return (
    <div className={open ? '' : ''}>
      <button
        className="w-full flex items-center gap-2 px-2.5 py-[9px] rounded-[7px] text-fg-1 text-[12.5px] cursor-pointer hover:bg-bg-3 hover:text-fg-0 transition-colors"
        onClick={onToggle}
      >
        <ChevronIcon
          className="text-fg-3 transition-transform duration-150"
          style={{ transform: open ? 'none' : 'rotate(-90deg)' }}
        />
        <span className="font-medium text-fg-0 flex-1 text-left">{label}</span>
        <span className="font-mono text-[10.5px] text-fg-3">{count}</span>
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

export function ConfirmCard({ payload, onConfirm, onCancel, disabled }: Props) {
  const sections = Object.keys(payload.preview);
  const [sectionsOpen, setSectionsOpen] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  function handleConfirm() {
    setConfirmed(true);
    onConfirm();
  }

  return (
    <div
      className={[
        'flex-1 min-w-0 bg-bg-2 border rounded-[14px] overflow-hidden',
        'max-w-[calc(100%-38px)]',
        confirmed
          ? 'border-[color-mix(in_oklch,var(--color-ok)_40%,var(--color-line))]'
          : 'border-line',
      ].join(' ')}
      style={{ boxShadow: '0 1px 0 oklch(1 0 0 / 0.02) inset, 0 12px 32px -16px rgba(0,0,0,0.5)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-4 py-3.5 border-b border-line-2">
        <div className="flex gap-3 items-start min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border text-accent"
            style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent-line)' }}
          >
            <SparkleIcon />
          </div>
          <div className="min-w-0">
            <div className="text-[10.5px] tracking-[0.08em] uppercase text-accent font-semibold">
              New CV preset ready
            </div>
            <div className="text-[15px] font-semibold tracking-tight mt-0.5 break-words">
              {payload.preset_name.replace(/_/g, ' ')}
            </div>
            <div className="mt-1 text-[12px] text-fg-3 break-all font-mono">
              {payload.preset_name}
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <span className="font-mono text-[11px] text-fg-2 bg-bg-1 border border-line-2 px-1.5 py-0.5 rounded-[5px]">
            {sections.length} sections
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-2 py-1.5">
        <Section
          open={sectionsOpen}
          onToggle={() => setSectionsOpen((o) => !o)}
          label="Sections included"
          count={`${sections.length} total`}
        >
          <div className="flex flex-wrap gap-1.5">
            {sections.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2 py-1 bg-bg-1 border border-line-2 rounded-full text-[11.5px] text-fg-1 font-mono"
              >
                <CheckIcon className="text-ok" width="10" height="10" />
                {s}
              </span>
            ))}
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 px-4 py-3 bg-bg-1 border-t border-line-2">
        <div className="flex items-center gap-1.5 text-[11.5px] text-fg-3 min-w-0">
          <DocIcon className="shrink-0" />
          <span className="truncate">
            Action: <span className="font-mono text-fg-2">{payload.action}</span>
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onCancel}
            disabled={disabled || confirmed}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-bg-2 border border-line-2 text-fg-1 rounded-lg text-[12.5px] font-medium cursor-pointer hover:bg-bg-3 hover:text-fg-0 transition-colors disabled:opacity-50 disabled:cursor-default"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={disabled || confirmed}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-accent text-accent-ink rounded-lg text-[12.5px] font-medium cursor-pointer hover:bg-accent-hi transition-colors disabled:opacity-50 disabled:cursor-default"
          >
            {confirmed ? (
              <>
                <CheckIcon width="11" height="11" />
                Saved
              </>
            ) : (
              'Confirm & Save'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
