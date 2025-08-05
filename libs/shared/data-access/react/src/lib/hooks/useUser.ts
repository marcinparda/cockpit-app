import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { UserInfoResponse } from '@cockpit-app/api-types';
import { getCurrentUser } from '@cockpit-app/common-shared-data-access';
import { queryKeys } from '../queryKeys';

interface UseUserOptions {
  withRedirect?: boolean;
  options?: Partial<
    UseQueryOptions<UserInfoResponse, Error, UserInfoResponse, QueryKey>
  >;
}

export function useUser({
  withRedirect = true,
  options = {},
}: UseUserOptions = {}) {
  const queryFn = () => getCurrentUser(withRedirect);
  return useQuery<UserInfoResponse>({
    queryFn,
    queryKey: [queryKeys.user],
    ...options,
  });
}
