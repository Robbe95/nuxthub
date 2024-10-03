import { pingerProjectService } from '@server/modules/pinger/services/pingerProject.service'
import { authProcedure } from '@server/trpc/trpc'
import {
  deletePingerProjectPayloadSchema,
  pingerProjectResponseSchema,
  postPingerProjectPayloadSchema,
  updatePingerProjectPayloadSchema,
} from '@shared/models/pinger-project/pingerProject.schema'
import { pingerProjectTransformer } from '@shared/models/pinger-project/pingerProject.transformer'

export const deletePingerProject = authProcedure
  .input(deletePingerProjectPayloadSchema)
  .mutation(({ input }) => {
    return pingerProjectService.delete(input)
  })

export const postPingerProject = authProcedure
  .input(postPingerProjectPayloadSchema)
  .output(pingerProjectResponseSchema)
  .mutation(async ({ input }) => {
    const response = await pingerProjectService.post(input)

    return pingerProjectTransformer.toResponse(response)
  })

export const updatePingerProject = authProcedure
  .input(updatePingerProjectPayloadSchema)
  .output(pingerProjectResponseSchema)
  .mutation(async ({ input }) => {
    const response = await pingerProjectService.update(input)

    return pingerProjectTransformer.toResponse(response)
  })
