import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Archive } from 'lucide-react';
import { Preset } from '../types/preset.types';

interface PresetDropdownProps {
  presets: Preset[];
  selectedPresetId: string;
  isDirty: boolean;
  onSelect: (id: string) => void;
  onCreateNew: () => void;
  onArchive: (id: string) => void;
}

const BASE_PRESET_ID = 'base';
const BASE_PRESET_LABEL = 'Base';

export function PresetDropdown({
  presets,
  selectedPresetId,
  isDirty,
  onSelect,
  onCreateNew,
  onArchive,
}: PresetDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  function getSelectedLabel(): string {
    if (selectedPresetId === BASE_PRESET_ID) {
      return BASE_PRESET_LABEL;
    }
    return presets.find((p) => p.id === selectedPresetId)?.label ?? selectedPresetId;
  }

  function handleSelect(id: string) {
    onSelect(id);
    setIsOpen(false);
  }

  function handleArchive(event: React.MouseEvent, id: string) {
    event.stopPropagation();
    onArchive(id);
  }

  const allOptions: Array<{ id: string; label: string; isBase: boolean }> = [
    { id: BASE_PRESET_ID, label: BASE_PRESET_LABEL, isBase: true },
    ...presets.map((p) => ({ id: p.id, label: p.label, isBase: false })),
  ];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex min-w-[160px] items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1.5 truncate">
          {getSelectedLabel()}
          {isDirty && (
            <span
              className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500"
              title="Unsaved changes"
              aria-label="Unsaved changes"
            />
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-slate-500 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select preset"
          className="absolute left-0 z-50 mt-1 min-w-[200px] rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
        >
          {allOptions.map((option) => {
            const isSelected = option.id === selectedPresetId;
            const isHovered = hoveredId === option.id;

            return (
              <div
                key={option.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.id)}
                onMouseEnter={() => setHoveredId(option.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span className="truncate font-medium">{option.label}</span>
                  {isSelected && isDirty && (
                    <span
                      className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500"
                      title="Unsaved changes"
                    />
                  )}
                </span>

                {!option.isBase && (
                  <button
                    type="button"
                    onClick={(e) => handleArchive(e, option.id)}
                    title={`Archive "${option.label}"`}
                    className={`flex-shrink-0 rounded p-0.5 text-slate-400 transition-all hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    tabIndex={isHovered ? 0 : -1}
                    aria-label={`Archive ${option.label}`}
                  >
                    <Archive className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          <div className="mx-2 my-1 border-t border-slate-100" />

          <button
            type="button"
            onClick={() => {
              onCreateNew();
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Plus className="h-4 w-4" />
            New Preset
          </button>
        </div>
      )}
    </div>
  );
}
