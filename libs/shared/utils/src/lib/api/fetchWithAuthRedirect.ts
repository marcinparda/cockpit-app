import { environments } from "../environments/environments";

export async function fetchWithAuthRedirect(
  url: string,
  options: RequestInit = {}
) {
  options.credentials = 'include';
  const response = await fetch(url, options);

  if (response.status === 401) {
    const loginUrl = new URL(environments.loginUrl, window.location.origin);
    loginUrl.searchParams.set('redirect_uri', window.location.href);
    window.location.href = loginUrl.toString();
    throw new Error('Unauthorized access, redirecting to login');
  }

  return response;
}
