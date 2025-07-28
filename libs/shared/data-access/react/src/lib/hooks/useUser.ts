import { useQuery } from '@tanstack/react-query';
import { UserInfoResponse } from '@cockpit-app/types-shared-auth';
import { queryKeys } from '../constants/queryKeys';
import { getUser } from '../api/getUser';

export function useUser() {
  return useQuery<UserInfoResponse>({
    queryKey: [queryKeys.user],
    queryFn: getUser,
  });
}
