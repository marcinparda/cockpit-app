import { z } from 'zod';

// Main fetch function with validation
export async function fetchWithValidation<ResponseData>(
  url: string,
  responseDataSchema: z.ZodType<ResponseData>,
  options: RequestInit = {}
) {
  options.credentials = 'include';
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(url, options);

    const data = await response.json();

    try {
      const parsedData = responseDataSchema.parse(data);
      return parsedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          '[ZOD ERROR] Fetch response data validation error: ' +
            JSON.stringify(error.message, null, 2)
        );
      }
      throw error;
    }
  } catch (error) {
    throw error;
  }
}
