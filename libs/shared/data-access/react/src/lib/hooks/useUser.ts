import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@cockpit-app/common-shared-data-access';
import { queryKeys } from '../queryKeys';

export function useUser() {
  return useQuery<UserInfoResponse>({
    queryKey: [queryKeys.user],
    queryFn: getCurrentUser,
  });
}
