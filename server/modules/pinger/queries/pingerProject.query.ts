import { pingerProjectService } from '@server/modules/pinger/services/pingerProject.service'
import { authProcedure } from '@server/trpc/trpc'
import { getByUuidPingerProjectPayload } from '@shared/models/pinger-project/pingerProject.schema'

export const getPingerProjects = authProcedure
  .query(() => {
    return pingerProjectService.getAll()
  })

export const getPingerProjectByUuid = authProcedure
  .input(getByUuidPingerProjectPayload)
  .query(({ input }) => {
    return pingerProjectService.getByUuid(input.pingerProjectId)
  })
