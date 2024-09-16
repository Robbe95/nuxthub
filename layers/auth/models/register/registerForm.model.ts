import { useGlobalI18n } from '@base/composables/i18n/useGlobaI18n'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

export const registerFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  passwords: z.object({
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  }).superRefine((data, ctx) => {
    const { t } = useGlobalI18n()

    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('errors.passwords_do_not_match'),
        path: [
          'password',
        ],
      })
    }
  }),
  phone: z.string().superRefine((value, ctx) => {
    const { t } = useGlobalI18n()

    if (!isValidPhoneNumber(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('errors.invalid_phone'),
      })
    }
  }),
})

export type RegisterForm = z.infer<typeof registerFormSchema>
