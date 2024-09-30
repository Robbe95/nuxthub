import type {
  DeletePingerProjectPayload,
  GetByUuidPingerProjectPayload,
  PostPingerProjectPayload,
  UpdatePingerProjectPayload,
} from '@shared/models/pinger-project/pingerProject.schema'

import { useTrpc } from '~/api/useTrpc'

export const pingerProjectService = {
  async deletePingerProject(payload: DeletePingerProjectPayload) {
    const { trpc } = useTrpc()

    await trpc.pinger.deletePingerProject.mutate(payload)
  },

  async getPingerProjectByUuid(payload: GetByUuidPingerProjectPayload) {
    const { trpc } = useTrpc()

    const data = await trpc.pinger.getPingerProjectByUuid.query(payload)

    return data
  },

  async getPingerProjects() {
    const { trpc } = useTrpc()

    const data = await trpc.pinger.getPingerProjects.query()

    return data
  },

  async postPingerProject(payload: PostPingerProjectPayload) {
    const { trpc } = useTrpc()

    const data = await trpc.pinger.postPingerProject.mutate(payload)

    return data
  },

  async updatePingerProject(payload: UpdatePingerProjectPayload) {
    const { trpc } = useTrpc()

    const data = await trpc.pinger.updatePingerProject.mutate(payload)

    return data
  },
}
