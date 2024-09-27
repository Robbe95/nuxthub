import { pingerUrl } from '@server/database/schema'
import { primaryId } from '@server/database/uuid/primaryId.field'
import {
  date,
  numeric,
  pgEnum,
  pgTable,
  uuid,
} from 'drizzle-orm/pg-core'

export const pingStateEnum = pgEnum('state', [
  'pending',
  'success',
  'error',
])

export const pingerPing = pgTable('pinger_ping', {
  id: primaryId,
  pingerUrlId: uuid('pinger_url_id')
    .notNull()
    .references(() => pingerUrl.id),
  createdAt: date('created_at').notNull().defaultNow(),
  responseTime: numeric('time').notNull(),
  state: pingStateEnum('state').notNull(),
})
