// Single source of truth for section key iteration — values match Redis key suffixes in cvStoreApi.ts
export const CV_SECTIONS = [
  'header',
  'summary',
  'skills',
  'achievements',
  'experience',
  'education',
  'projects',
  'courses',
] as const;

export type SectionKey = typeof CV_SECTIONS[number];

export interface Preset {
  id: string;
  label: string;
  description?: string;
  created_at: string;
  archived: boolean;
}

export type PresetRegistry = Preset[];

export type DirtySet = Set<SectionKey>;
