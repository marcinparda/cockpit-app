import { z } from 'zod';
import { baseApi } from '@cockpit-app/common-shared-data-access';
import { PresetRegistry, SectionKey } from '../types/preset.types';

const storeEnvelopeSchema = z.object({
  meta: z.object({
    key: z.string(),
    type: z.string(),
    version: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    tags: z.array(z.string()),
  }),
  data: z.unknown(),
});

const REGISTRY_ENDPOINT = '/api/v1/store/registry/cv/presets';

export async function fetchRegistry(): Promise<PresetRegistry> {
  try {
    const envelope = await baseApi.getRequest(REGISTRY_ENDPOINT, storeEnvelopeSchema);
    return envelope.data as PresetRegistry;
  } catch (error) {
    if (error instanceof Error && error.message.includes('HTTP 404')) {
      return [];
    }
    throw error;
  }
}

export async function saveRegistry(registry: PresetRegistry): Promise<void> {
  await baseApi.putRequest(REGISTRY_ENDPOINT, storeEnvelopeSchema, {
    type: 'cv_registry',
    tags: ['cv', 'presets'],
    data: registry,
  });
}

export async function fetchPresetSection(
  presetId: string,
  section: SectionKey
): Promise<unknown | null> {
  const endpoint = `/api/v1/store/${presetId}/cv/${section}`;
  try {
    const envelope = await baseApi.getRequest(endpoint, storeEnvelopeSchema);
    return envelope.data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('HTTP 404')) {
      return null;
    }
    throw error;
  }
}

export async function savePresetSection(
  presetId: string,
  section: SectionKey,
  data: unknown
): Promise<void> {
  const endpoint = `/api/v1/store/${presetId}/cv/${section}`;
  await baseApi.putRequest(endpoint, storeEnvelopeSchema, {
    type: 'cv_section',
    tags: ['cv', section],
    data,
  });
}

export async function clonePresetSections(
  sourceId: string,
  targetId: string,
  sections: SectionKey[]
): Promise<void> {
  const fetched = await Promise.all(
    sections.map((section) => fetchPresetSection(sourceId, section))
  );

  const toSave = sections
    .map((section, i) => ({ section, data: fetched[i] }))
    .filter(({ data }) => data !== null);

  await Promise.all(
    toSave.map(({ section, data }) => savePresetSection(targetId, section, data))
  );
}
