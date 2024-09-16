import { generateUuid } from '@shared/utils/uuid/generateUuid.util'
import { text } from 'drizzle-orm/sqlite-core'

export const primaryId = text('uuid').$defaultFn(() => generateUuid()).notNull().primaryKey()
