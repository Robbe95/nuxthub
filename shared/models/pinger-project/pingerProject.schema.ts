import { z } from 'zod'

export const pingerProjectId = z.string().uuid().brand('PingerProjectId')
export const postPingerProjectPayloadSchema = z.object({
  name: z.string(),
})
export const updatePingerProjectPayloadSchema = z.object({
  pingerProjectId,
  name: z.string(),
})
export const deletePingerProjectPayloadSchema = z.object({
  pingerProjectId,
})

export const getByUuidPingerProjectPayloadSchema = z.object({
  pingerProjectId,
})

export const pingerProjectResponseSchema = z.object({
  id: pingerProjectId,
  name: z.string(),
})

export const pingerProjectCreateSchema = z.object({
  info: z.object({
    name: z.string(),
  }),
})

export type PingerProjectId = z.infer<typeof pingerProjectId>
export type PostPingerProjectPayload = z.infer<typeof postPingerProjectPayloadSchema>
export type UpdatePingerProjectPayload = z.infer<typeof updatePingerProjectPayloadSchema>
export type DeletePingerProjectPayload = z.infer<typeof deletePingerProjectPayloadSchema>
export type GetByUuidPingerProjectPayload = z.infer<typeof getByUuidPingerProjectPayloadSchema>
export type PingerProjectResponse = z.infer<typeof pingerProjectResponseSchema>
export type PingerProjectCreateSchema = z.infer<typeof pingerProjectCreateSchema>
