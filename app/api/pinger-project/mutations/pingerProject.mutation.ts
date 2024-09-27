import type {
  DeletePingerProjectPayload,
  PostPingerProjectPayload,
  UpdatePingerProjectPayload,
} from '@shared/models/pinger-project/pingerProject.schema'
import { useMutation } from '@tanstack/vue-query'

import { pingerProjectService } from '~/api/pinger-project/service/pingerProject.service'

export function usePostPingerProjectsMutation() {
  return useMutation({
    mutationFn: async (payload: PostPingerProjectPayload) => {
      const user = await pingerProjectService.postPingerProject(payload)

      return user
    },
  })
};

export function useUpdatePingerProjectMutation() {
  return useMutation({
    mutationFn: async (payload: UpdatePingerProjectPayload) => {
      const user = await pingerProjectService.updatePingerProject(payload)

      return user
    },
  })
};

export function useDeletePingerProjectMutation() {
  return useMutation({
    mutationFn: async (payload: DeletePingerProjectPayload) => {
      const user = await pingerProjectService.deletePingerProject(payload)

      return user
    },
  })
};
