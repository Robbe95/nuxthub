import { z } from 'zod'

export const pingerProjectId = z.string().uuid().brand('PingerProjectId')
export const postPingerProjectPayload = z.object({
  name: z.string(),
})
export const updatePingerProjectPayload = z.object({
  pingerProjectId,
  name: z.string(),
})
export const deletePingerProjectPayload = z.object({
  pingerProjectId,
})

export const getByUuidPingerProjectPayload = z.object({
  pingerProjectId,
})

export const pingerProjectResponse = z.object({
  id: pingerProjectId,
  name: z.string(),
})

export type PingerProjectId = z.infer<typeof pingerProjectId>
export type PostPingerProjectPayload = z.infer<typeof postPingerProjectPayload>
export type UpdatePingerProjectPayload = z.infer<typeof updatePingerProjectPayload>
export type DeletePingerProjectPayload = z.infer<typeof deletePingerProjectPayload>
export type GetByUuidPingerProjectPayload = z.infer<typeof getByUuidPingerProjectPayload>
export type PingerProjectResponse = z.infer<typeof pingerProjectResponse>
