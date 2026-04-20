import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CVData } from '../types/cv.types';
import { CV_SECTIONS, SectionKey, DirtySet } from '../types/preset.types';
import {
  headerData,
  summaryData,
  skillsData,
  achievementsData,
  experienceData,
  educationData,
  personalProjectsData,
  coursesData,
} from '../data/cvData';
import { getCVData, putCVData } from '../services/cvStoreApi';
import { fetchPresetSection, savePresetSection } from '../services/presetApi';

const defaultCVData: CVData = {
  header: headerData,
  summary: summaryData,
  skills: skillsData,
  achievements: achievementsData,
  experience: experienceData,
  education: educationData,
  personalProjects: personalProjectsData,
  courses: coursesData,
};

// Maps SectionKey (Redis key suffix / CV_SECTIONS value) to the CVData field name.
// 'projects' is the only mismatch — it maps to personalProjects.
function sectionToField(section: SectionKey): keyof CVData {
  if (section === 'projects') return 'personalProjects';
  return section as keyof CVData;
}

async function fetchPresetCVData(presetId: string): Promise<CVData> {
  const results = await Promise.all(
    CV_SECTIONS.map(async (section) => {
      let data = await fetchPresetSection(presetId, section);
      if (data === null) {
        data = await fetchPresetSection('base', section);
      }
      return { section, data };
    })
  );

  const cvData: Partial<CVData> = {};
  for (const { section, data } of results) {
    const field = sectionToField(section);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (cvData as any)[field] = data;
  }

  return cvData as CVData;
}

export function useCVData(presetId = 'base') {
  const isBase = presetId === 'base';
  const queryClient = useQueryClient();

  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [dirtySet, setDirtySet] = useState<DirtySet>(new Set<SectionKey>());
  const isInitialLoadDone = useRef(false);

  // Reset dirty tracking and re-arm initial load guard whenever the preset changes.
  useEffect(() => {
    setDirtySet(new Set<SectionKey>());
    isInitialLoadDone.current = false;
  }, [presetId]);

  // ── Query ──────────────────────────────────────────────────────────────────

  const { data: storedData, isLoading } = useQuery({
    queryKey: ['cv-store-data', presetId],
    queryFn: () => (isBase ? getCVData('base') : fetchPresetCVData(presetId)),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!isLoading && !isInitialLoadDone.current) {
      isInitialLoadDone.current = true;
      if (storedData) {
        setCVData(storedData as CVData);
      }
    }
  }, [isLoading, storedData]);

  // ── Mutation ───────────────────────────────────────────────────────────────

  const { mutate: saveBase, isPending: isSavingBase } = useMutation({
    mutationFn: (data: CVData) => putCVData(data, 'base'),
    onSuccess: () => {
      // Invalidate all preset caches so they re-fetch with updated base fallbacks.
      queryClient.invalidateQueries({ queryKey: ['cv-store-data'] });
    },
  });

  const { mutate: savePreset, isPending: isSavingPreset } = useMutation({
    mutationFn: async ({ data, dirty }: { data: CVData; dirty: DirtySet }) => {
      if (dirty.size === 0) return;
      await Promise.all(
        Array.from(dirty).map((section) => {
          const field = sectionToField(section);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return savePresetSection(presetId, section, (data as any)[field]);
        })
      );
    },
    onSuccess: () => {
      setDirtySet(new Set<SectionKey>());
    },
  });

  const isSaving = isSavingBase || isSavingPreset;

  // ── Public API ─────────────────────────────────────────────────────────────

  function saveToApi() {
    if (isBase) {
      saveBase(cvData);
    } else {
      savePreset({ data: cvData, dirty: dirtySet });
    }
  }

  function resetToDefault() {
    setCVData(defaultCVData);
  }

  function markDirty(section: SectionKey): void {
    if (isBase) return;
    setDirtySet((prev) => {
      const next = new Set(prev);
      next.add(section);
      return next;
    });
  }

  function clearDirty(): void {
    setDirtySet(new Set<SectionKey>());
  }

  const isDirty = dirtySet.size > 0;

  return {
    cvData,
    setCVData,
    resetToDefault,
    saveToApi,
    isSaving,
    isLoading,
    dirtySet,
    isDirty,
    markDirty,
    clearDirty,
  };
}
