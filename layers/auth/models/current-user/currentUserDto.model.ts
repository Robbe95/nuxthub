import { z } from 'zod'

import { userIdSchema } from './currentUserId.model'

export const currentUserDtoSchema = z.object({
  id: userIdSchema,
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
})

export type CurrentUserDto = z.infer<typeof currentUserDtoSchema>
