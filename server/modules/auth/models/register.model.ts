import { isValidPhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

export const registerInputSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
  phone: z.string().superRefine((value, ctx) => {
    if (!isValidPhoneNumber(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'INVALID_PHONE_NUMBER',
      })
    }
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'PASSWORDS_DO_NOT_MATCH',
})

export type RegisterInput = z.infer<typeof registerInputSchema>
