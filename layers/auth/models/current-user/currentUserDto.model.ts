import { z } from 'zod'

import { userIdSchema } from './currentUserId.model'

export const currentUserDtoSchema = z.object({
  id: userIdSchema,
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
})

export type CurrentUserDto = z.infer<typeof currentUserDtoSchema>
