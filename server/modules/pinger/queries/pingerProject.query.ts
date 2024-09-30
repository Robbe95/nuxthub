import { pingerProjectService } from '@server/modules/pinger/services/pingerProject.service'
import { authProcedure } from '@server/trpc/trpc'
import {
  getByUuidPingerProjectPayload,
  pingerProjectResponse,
} from '@shared/models/pinger-project/pingerProject.schema'
import { pingerProjectTransformer } from '@shared/models/pinger-project/pingerProject.transformer'
import { TRPCError } from '@trpc/server'

export const getPingerProjects = authProcedure
  .output(pingerProjectResponse.array())
  .query(async () => {
    const response = await pingerProjectService.getAll()

    return response.map(pingerProjectTransformer.toResponse)
  })

export const getPingerProjectByUuid = authProcedure
  .input(getByUuidPingerProjectPayload)
  .output(pingerProjectResponse)
  .query((async ({ input }) => {
    const response = await pingerProjectService.getByUuid(input.pingerProjectId)

    if (response == null) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No pinger project found with this UUID',
      })
    }

    return pingerProjectTransformer.toResponse(response)
  }))
