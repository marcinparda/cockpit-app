import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@cockpit-app/common-shared-data-access';
import { queryKeys } from '../queryKeys';
import { UserInfoResponse } from '@cockpit-app/api-types';

interface UseUserOptions {
  withRedirect?: boolean;
}

export function useUser({ withRedirect }: UseUserOptions = {}) {
  return useQuery<UserInfoResponse>({
    queryKey: [queryKeys.user],
    queryFn: () => getCurrentUser(withRedirect),
  });
}
