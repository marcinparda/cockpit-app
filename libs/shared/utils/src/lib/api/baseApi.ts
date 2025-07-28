import { z } from 'zod';
import { fetcher } from './fetcher';
import { environments } from '../environments/environments';

/**
 * Sends a GET request to the specified endpoint and validates the response using the provided Zod schema.
 * @param endpoint API endpoint (relative to apiUrl)
 * @param responseDataSchema Zod schema for response validation
 */
async function getRequest<ResponseData>(
  endpoint: string,
  responseDataSchema: z.ZodType<ResponseData>,
  withRedirect = true
) {
  return fetcher({
    url: `${environments.apiUrl}${endpoint}`,
    responseDataSchema,
    options: { method: 'GET' },
    withRedirect,
  });
}

/**
 * Sends a POST request to the specified endpoint with a JSON body and validates the response using the provided Zod schema.
 * @param endpoint API endpoint (relative to apiUrl)
 * @param responseDataSchema Zod schema for response validation
 * @param body Request body
 */
async function postRequest<ResponseData, RequestBody>(
  endpoint: string,
  responseDataSchema: z.ZodType<ResponseData>,
  body: RequestBody
) {
  return fetcher({
    url: `${environments.apiUrl}${endpoint}`,
    responseDataSchema,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  });
}

/**
 * Sends a PUT request to the specified endpoint with a JSON body and validates the response using the provided Zod schema.
 * @param endpoint API endpoint (relative to apiUrl)
 * @param responseDataSchema Zod schema for response validation
 * @param body Request body
 */
async function putRequest<ResponseData, RequestBody>(
  endpoint: string,
  responseDataSchema: z.ZodType<ResponseData>,
  body: RequestBody
) {
  return fetcher({
    url: `${environments.apiUrl}${endpoint}`,
    responseDataSchema,
    options: {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  });
}

/**
 * Sends a DELETE request to the specified endpoint and validates the response using the provided Zod schema.
 * @param endpoint API endpoint (relative to apiUrl)
 * @param responseDataSchema Zod schema for response validation
 */
async function deleteRequest<ResponseData>(
  endpoint: string,
  responseDataSchema: z.ZodType<ResponseData>
) {
  return fetcher({
    url: `${environments.apiUrl}${endpoint}`,
    responseDataSchema,
    options: { method: 'DELETE' },
  });
}

export const baseApi = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
