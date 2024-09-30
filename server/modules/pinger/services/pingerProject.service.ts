import { pingerProject } from '@server/database/schema'
import type {
  DeletePingerProjectPayload,
  PingerProjectId,
  PostPingerProjectPayload,
  UpdatePingerProjectPayload,
} from '@shared/models/pinger-project/pingerProject.schema'
import { eq } from 'drizzle-orm'

export const pingerProjectService = {
  async delete(payload: DeletePingerProjectPayload) {
    const drizzle = useDrizzle()

    await drizzle
      .delete(pingerProject)
      .where(eq(pingerProject.id, payload.pingerProjectId))
      .execute()
  },

  async getAll() {
    const drizzle = useDrizzle()

    const query = await drizzle
      .query
      .pingerProject
      .findMany({
        with: {
          pingerUrls: true,
        },
      })
      .execute()

    return query
  },

  async getByUuid(projectId: PingerProjectId) {
    const drizzle = useDrizzle()

    const query = await drizzle
      .query
      .pingerProject
      .findFirst({
        where: (projects, { eq }) => eq(projects.id, projectId),
        with: {
          pingerUrls: true,
        },
      })
      .execute()

    return query
  },

  async post(payload: PostPingerProjectPayload) {
    const drizzle = useDrizzle()

    const returningProject = await drizzle
      .insert(pingerProject)
      .values({
        name: payload.name,
      })
      .returning()
      .execute()

    return returningProject[0]
  },

  async update(payload: UpdatePingerProjectPayload) {
    const drizzle = useDrizzle()

    const query = await drizzle
      .update(pingerProject)
      .set({
        name: payload.name,
      })
      .where(eq(pingerProject.id, payload.pingerProjectId))
      .returning()
      .execute()

    return query[0]
  },

}
