import { getCurrentUser } from '@cockpit-app/common-shared-data-access';

export const currentUserService = {
  getCurrentUserInfo: getCurrentUser,
  // async getCurrentUserInfo(): Promise<UserInfoResponse> {
  //   try {
  //     const response = await httpClient.get(`${API_URL}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     throw error;
  //   }
  // },
};
