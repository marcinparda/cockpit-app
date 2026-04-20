import { z } from 'zod';
import { baseApi } from '@cockpit-app/common-shared-data-access';
import { CVData } from '../types/cv.types';

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

function getEndpoints(prefix: string) {
  const BASE = `/api/v1/store/${prefix}/cv`;
  return {
    header: `${BASE}/header`,
    summary: `${BASE}/summary`,
    skills: `${BASE}/skills`,
    achievements: `${BASE}/achievements`,
    experience: `${BASE}/experience`,
    education: `${BASE}/education`,
    personalProjects: `${BASE}/projects`,
    courses: `${BASE}/courses`,
  } as const;
}

// fetchSection already returns null on 404 (when error.message includes 'HTTP 404')
// rather than throwing, so callers are protected from missing-section errors.
async function fetchSection<T>(endpoint: string): Promise<T | null> {
  try {
    const envelope = await baseApi.getRequest(endpoint, storeEnvelopeSchema);
    return envelope.data as T;
  } catch (error) {
    if (error instanceof Error && error.message.includes('HTTP 404')) {
      return null;
    }
    throw error;
  }
}

export async function getCVData(prefix: string = 'base'): Promise<CVData | null> {
  const ENDPOINTS = getEndpoints(prefix);
  const [
    header,
    summary,
    skills,
    achievements,
    experience,
    education,
    personalProjects,
    courses,
  ] = await Promise.all([
    fetchSection<CVData['header']>(ENDPOINTS.header),
    fetchSection<CVData['summary']>(ENDPOINTS.summary),
    fetchSection<CVData['skills']>(ENDPOINTS.skills),
    fetchSection<CVData['achievements']>(ENDPOINTS.achievements),
    fetchSection<CVData['experience']>(ENDPOINTS.experience),
    fetchSection<CVData['education']>(ENDPOINTS.education),
    fetchSection<CVData['personalProjects']>(ENDPOINTS.personalProjects),
    fetchSection<CVData['courses']>(ENDPOINTS.courses),
  ]);

  if (
    !header &&
    !summary &&
    !skills &&
    !achievements &&
    !experience &&
    !education &&
    !personalProjects &&
    !courses
  ) {
    return null;
  }

  return {
    header,
    summary,
    skills,
    achievements,
    experience,
    education,
    personalProjects,
    courses,
  };
}

export async function putCVData(data: CVData, prefix: string = 'base'): Promise<void> {
  const ENDPOINTS = getEndpoints(prefix);
  await Promise.all([
    baseApi.putRequest(ENDPOINTS.header, storeEnvelopeSchema, {
      type: 'cv_section',
      tags: ['cv', 'header'],
      data: data.header,
    }),
    baseApi.putRequest(ENDPOINTS.summary, storeEnvelopeSchema, {
      type: 'cv_section',
      tags: ['cv', 'summary'],
      data: data.summary,
    }),
    baseApi.putRequest(ENDPOINTS.skills, storeEnvelopeSchema, {
      type: 'cv_section',
      tags: ['cv', 'skills'],
      data: data.skills,
    }),
    baseApi.putRequest(ENDPOINTS.achievements, storeEnvelopeSchema, {
      type: 'cv_section',
      tags: ['cv', 'achievements'],
      data: data.achievements,
    }),
    baseApi.putRequest(ENDPOINTS.experience, storeEnvelopeSchema, {
      type: 'cv_section',
      tags: ['cv', 'experience'],
      data: data.experience,
    }),
    baseApi.putRequest(ENDPOINTS.education, storeEnvelopeSchema, {
      type: 'cv_section',
      tags: ['cv', 'education'],
      data: data.education,
    }),
    baseApi.putRequest(ENDPOINTS.personalProjects, storeEnvelopeSchema, {
      type: 'cv_section',
      tags: ['cv', 'projects'],
      data: data.personalProjects,
    }),
    baseApi.putRequest(ENDPOINTS.courses, storeEnvelopeSchema, {
      type: 'cv_section',
      tags: ['cv', 'courses'],
      data: data.courses,
    }),
  ]);
}
