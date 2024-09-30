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
      const response = await pingerProjectService.postPingerProject(payload)

      return response
    },
  })
};

export function useUpdatePingerProjectMutation() {
  return useMutation({
    mutationFn: async (payload: UpdatePingerProjectPayload) => {
      const response = await pingerProjectService.updatePingerProject(payload)

      return response
    },
  })
};

export function useDeletePingerProjectMutation() {
  return useMutation({
    mutationFn: async (payload: DeletePingerProjectPayload) => {
      const response = await pingerProjectService.deletePingerProject(payload)

      return response
    },
  })
};
