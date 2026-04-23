import { CheckIcon } from './Icons';

interface Props {
  steps: string[];
}

export function StatusMessage({ steps }: Props) {
  if (steps.length === 0) return null;

  const activeIndex = steps.length - 1;

  return (
    <div className="my-2.5 border border-line-2 rounded-[10px] overflow-hidden" style={{ background: 'color-mix(in oklch, var(--color-bg-2), transparent 20%)' }}>
      <div className="flex flex-col p-1">
        {steps.map((label, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <div
              key={i}
              className={[
                'flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[12.5px]',
                done ? 'text-fg-2' : active ? 'text-fg-0 bg-bg-2' : 'text-fg-3',
              ].join(' ')}
            >
              {/* Icon */}
              <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                {done ? (
                  <CheckIcon className="text-ok" width="12" height="12" />
                ) : active ? (
                  <span
                    className="w-2.5 h-2.5 rounded-full border-[1.5px] animate-spin-cw"
                    style={{
                      borderColor: 'var(--accent-soft)',
                      borderTopColor: 'var(--color-accent)',
                    }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-line" />
                )}
              </span>

              {/* Label */}
              <span className="flex-1">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
