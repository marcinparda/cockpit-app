import { z } from 'zod';
import { fetchWithAuthRedirect } from './fetchWithAuthRedirect';

// Main fetch function with validation
export async function fetchWithValidation<ResponseData>(
  url: string,
  responseDataSchema: z.ZodType<ResponseData>,
  options: RequestInit = {}
) {
  const response = await fetchWithAuthRedirect(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  try {
    const parsedData = responseDataSchema.parse(data);
    return parsedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        'Fetch response data validation error: ' + JSON.stringify(error.message, null, 2)
      );
    }
    throw error;
  }
}
