import {
  getCurrentUser,
  changePassword,
  login,
  logout,
  refreshAccessToken,
} from './api';

/**
 * Checks if the user is currently logged in (via API call).
 */
async function isLoggedIn() {
  try {
    const user = await getCurrentUser();
    if (!user) return false;
    return true;
  } catch {
    return false;
  }
}

export {
  getCurrentUser,
  changePassword,
  login,
  logout,
  refreshAccessToken,
  isLoggedIn,
};
