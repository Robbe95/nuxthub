import { authKeys } from '@auth/api/query-keys/auth.queryKeys'
import { AuthService } from '@auth/api/services/auth.service'
import { useQuery } from '@base/composables/query/useQuery'

export function useMeQuery() {
  const userSession = useUserSession()

  return useQuery({
    staleTime: Infinity,
    queryFn: async () => {
      const user = await AuthService.getMe()

      return user
    },
    queryKey: authKeys.me(userSession.user.value?.email ?? '').queryKey,
  })
};
