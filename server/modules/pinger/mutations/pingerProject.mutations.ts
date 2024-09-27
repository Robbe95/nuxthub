import { pingerProjectService } from '@server/modules/pinger/services/pingerProject.service'
import { authProcedure } from '@server/trpc/trpc'
import {
  deletePingerProjectPayload,
  postPingerProjectPayload,
  updatePingerProjectPayload,
} from '@shared/models/pinger-project/pingerProject.schema'

export const deletePingerProject = authProcedure
  .input(deletePingerProjectPayload)
  .mutation(({ input }) => {
    return pingerProjectService.delete(input)
  })

export const postPingerProject = authProcedure
  .input(postPingerProjectPayload)
  .mutation(({ input }) => {
    return pingerProjectService.post(input)
  })

export const updatePingerProject = authProcedure
  .input(updatePingerProjectPayload)
  .mutation(({ input }) => {
    return pingerProjectService.update(input)
  })
