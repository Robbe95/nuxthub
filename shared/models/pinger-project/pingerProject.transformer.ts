import type { PingerProject } from '@server/utils/useDrizzle'
import type {
  PingerProjectId,
  PingerProjectResponse,
} from '@shared/models/pinger-project/pingerProject.schema'

export const pingerProjectTransformer = {
  toResponse(dto: PingerProject): PingerProjectResponse {
    return {
      id: dto.id as PingerProjectId,
      name: dto.name,
    }
  },
}
