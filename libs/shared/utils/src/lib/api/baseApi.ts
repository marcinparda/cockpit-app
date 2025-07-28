import { z } from 'zod';
import { fetchWithValidation } from './fetchWithValidation';
import { environments } from '../environments/environments';

async function getRequest<ResponseData>(
  endpoint: string,
  responseDataSchema: z.ZodType<ResponseData>
) {
  return fetchWithValidation(
    `${environments.apiUrl}${endpoint}`,
    responseDataSchema,
    {
      method: 'GET',
    }
  );
}

async function postRequest<ResponseData, RequestBody>(
  endpoint: string,
  responseDataSchema: z.ZodType<ResponseData>,
  body: RequestBody
) {
  return fetchWithValidation(
    `${environments.apiUrl}${endpoint}`,
    responseDataSchema,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
}

async function putRequest<ResponseData, RequestBody>(
  endpoint: string,
  responseDataSchema: z.ZodType<ResponseData>,
  body: RequestBody
) {
  return fetchWithValidation(
    `${environments.apiUrl}${endpoint}`,
    responseDataSchema,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
}

async function deleteRequest<ResponseData>(
  endpoint: string,
  responseDataSchema: z.ZodType<ResponseData>
) {
  return fetchWithValidation(
    `${environments.apiUrl}${endpoint}`,
    responseDataSchema,
    {
      method: 'DELETE',
    }
  );
}

export const baseApi = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
