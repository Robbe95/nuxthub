import {
  deletePingerProject,
  postPingerProject,
  updatePingerProject,
} from '@server/modules/pinger/mutations/pingerProject.mutations'
import {
  getPingerProjectByUuid,
  getPingerProjects,
} from '@server/modules/pinger/queries/pingerProject.query'
import { router } from '@server/trpc/trpc'

export const pingerRouter = router({
  deletePingerProject,
  getPingerProjectByUuid,
  getPingerProjects,
  postPingerProject,
  updatePingerProject,
})
