import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Preset, PresetRegistry, CV_SECTIONS } from '../types/preset.types';
import { fetchRegistry, saveRegistry, clonePresetSections } from '../services/presetApi';
import { generateUniqueSlug } from '../utils/slug';

const QUERY_KEY = ['cv-presets-registry'] as const;
const DEFAULT_PRESET_ID = 'base';

function getPresetIdFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('preset') ?? DEFAULT_PRESET_ID;
}

function setPresetIdInUrl(id: string): void {
  const url = new URL(window.location.href);
  if (id === DEFAULT_PRESET_ID) {
    url.searchParams.delete('preset');
  } else {
    url.searchParams.set('preset', id);
  }
  history.replaceState(history.state, '', url.toString());
}

function resolveSelectedPresetId(
  paramId: string,
  presets: PresetRegistry,
): string {
  if (paramId === DEFAULT_PRESET_ID) {
    return DEFAULT_PRESET_ID;
  }
  const match = presets.find((p) => p.id === paramId);
  if (!match || match.archived) {
    return DEFAULT_PRESET_ID;
  }
  return paramId;
}

export interface UsePresetsResult {
  presets: Preset[];
  selectedPresetId: string;
  isLoading: boolean;
  selectPreset: (id: string) => void;
  createPreset: (label: string, description?: string) => Promise<Preset>;
  archivePreset: (id: string) => void;
}

export function usePresets(): UsePresetsResult {
  const queryClient = useQueryClient();

  const { data: registry = [], isLoading } = useQuery<PresetRegistry>({
    queryKey: QUERY_KEY,
    queryFn: fetchRegistry,
    staleTime: Infinity,
  });

  // Keep rawParamId in state so selectPreset triggers a re-render.
  const [rawParamId, setRawParamId] = useState<string>(getPresetIdFromUrl);

  // Validate against registry once it loads (archived/nonexistent → base).
  const selectedPresetId = resolveSelectedPresetId(rawParamId, registry);

  // Only correct the URL after registry has loaded — avoids overwriting a valid
  // preset param with 'base' while the registry is still empty.
  useEffect(() => {
    if (isLoading) return;
    if (selectedPresetId !== rawParamId) {
      setPresetIdInUrl(selectedPresetId);
      setRawParamId(selectedPresetId);
    }
  }, [isLoading, selectedPresetId, rawParamId]);

  function selectPreset(id: string): void {
    setPresetIdInUrl(id);
    setRawParamId(id);
  }

  async function createPreset(label: string, description?: string): Promise<Preset> {
    const freshRegistry = await fetchRegistry();

    const existingSlugs = freshRegistry.map((p) => p.id);
    const slug = generateUniqueSlug(label, existingSlugs);

    const newPreset: Preset = {
      id: slug,
      label,
      ...(description !== undefined ? { description } : {}),
      created_at: new Date().toISOString(),
      archived: false,
    };

    // Only clone explicit overrides from non-base presets. If source is base,
    // start empty so the new preset inherits from base dynamically.
    if (selectedPresetId !== DEFAULT_PRESET_ID) {
      await clonePresetSections(selectedPresetId, slug, [...CV_SECTIONS]);
    }

    const updatedRegistry: PresetRegistry = [...freshRegistry, newPreset];
    await saveRegistry(updatedRegistry);

    queryClient.setQueryData<PresetRegistry>(QUERY_KEY, updatedRegistry);

    return newPreset;
  }

  function archivePreset(id: string): void {
    if (id === DEFAULT_PRESET_ID) {
      throw new Error('Cannot archive the base preset.');
    }

    const updatedRegistry: PresetRegistry = registry.map((p) =>
      p.id === id ? { ...p, archived: true } : p,
    );

    saveRegistry(updatedRegistry).then(() => {
      queryClient.setQueryData<PresetRegistry>(QUERY_KEY, updatedRegistry);
    });
  }

  const activePresets = registry.filter((p) => !p.archived);

  return {
    presets: activePresets,
    selectedPresetId,
    isLoading,
    selectPreset,
    createPreset,
    archivePreset,
  };
}
