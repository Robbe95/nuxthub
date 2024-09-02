import { z } from 'zod'

import { userIdSchema } from './currentUserId.model'

export const currentUserSchema = z.object({
  id: userIdSchema,
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
})

export type CurrentUser = z.infer<typeof currentUserSchema>
