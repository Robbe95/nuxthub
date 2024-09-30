import { useQuery } from '@base/composables/query/useQuery'
import type { PingerProjectId } from '@shared/models/pinger-project/pingerProject.schema'

import { pingerProjectService } from '~/api/pinger-project/service/pingerProject.service'

export function useGetPingerProjectsQuery() {
  return useQuery({
    queryFn: async () => {
      const user = await pingerProjectService.getPingerProjects()

      return user
    },
    queryKey: [
      'pingerProjects',
    ],
  })
};

export function useGetPingerProjectByUuidQuery(uuid: MaybeRefOrGetter<PingerProjectId>) {
  return useQuery({
    queryFn: async () => {
      const user = await pingerProjectService.getPingerProjectByUuid({
        pingerProjectId: toValue(uuid),
      })

      return user
    },
    queryKey: [
      'pingerProjectByUuid',
      uuid,
    ],
  })
};

export function useRandomPingerProjectQuery() {
  return useQuery({
    queryFn: () => {
      return {
        notFound: false,
      }
    },
    queryKey: [
      'randomPingerProject',
    ],
  })
}
