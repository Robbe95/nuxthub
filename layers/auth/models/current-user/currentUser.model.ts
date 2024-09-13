import { z } from 'zod'

import { userIdSchema } from './currentUserId.model'

export const currentUserSchema = z.object({
  id: userIdSchema,
  userId: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
})

export type CurrentUser = z.infer<typeof currentUserSchema>
