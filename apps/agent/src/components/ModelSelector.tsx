import { useEffect, useRef, useState } from 'react';
import { ModelInfo } from '../api/agent';
import { CheckIcon, ChevronIcon } from './Icons';

interface Props {
  models: ModelInfo[];
  value: string;
  onChange: (model: string) => void;
  disabled?: boolean;
}

const MODEL_TAGS: Record<string, string> = {
  opus: 'Most capable',
  sonnet: 'Balanced',
  haiku: 'Fastest',
  llama: 'Open source',
};

function getModelTag(id: string): string {
  for (const [key, tag] of Object.entries(MODEL_TAGS)) {
    if (id.toLowerCase().includes(key)) return tag;
  }
  return '';
}

export function ModelSelector({ models, value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = models.find((m) => m.id === value);
  const displayLabel = current?.label ?? value.split('/').pop() ?? value;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center gap-2 px-2.5 py-1.5 bg-bg-2 border border-line-2 rounded-lg text-fg-0 text-[12.5px] cursor-pointer hover:bg-bg-3 transition-colors disabled:opacity-50"
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className="w-[7px] h-[7px] rounded-full shrink-0"
          style={{
            background: 'var(--color-accent)',
            boxShadow: '0 0 0 3px var(--accent-soft)',
          }}
        />
        <span className="hidden sm:inline">{displayLabel}</span>
        <ChevronIcon className={open ? 'rotate-180' : ''} style={{ transition: 'transform 0.15s' }} />
      </button>

      {open && models.length > 0 && (
        <div
          className="absolute right-0 top-[calc(100%+6px)] bg-bg-2 border border-line rounded-[10px] min-w-[260px] p-1.5 z-20"
          style={{ boxShadow: '0 12px 32px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02)' }}
          role="listbox"
        >
          {models.map((m) => {
            const tag = getModelTag(m.id);
            return (
              <button
                key={m.id}
                role="option"
                aria-selected={m.id === value}
                className={[
                  'w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-fg-0 text-[12.5px] text-left cursor-pointer',
                  m.id === value ? 'bg-bg-3' : 'hover:bg-bg-3',
                ].join(' ')}
                onClick={() => {
                  onChange(m.id);
                  setOpen(false);
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{m.label}</div>
                  {tag && <div className="text-[11px] text-fg-3 font-mono">{tag}</div>}
                </div>
                {m.id === value && <CheckIcon className="text-accent shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
