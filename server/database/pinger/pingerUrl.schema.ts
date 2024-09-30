import { pingerPing, pingerProject } from '@server/database/schema'
import { primaryId } from '@server/database/uuid/primaryId.field'
import { relations } from 'drizzle-orm'
import {
  date,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core'

export const pingerUrl = pgTable('pinger_url', {
  id: primaryId,
  pingerPingId: uuid('pinger_project_id')
    .notNull()
    .references(() => pingerProject.id),
  createdAt: date('created_at').notNull().defaultNow(),
  name: text('name'),
  url: text('url'),
})

export const pingerUrlRelations = relations(pingerUrl, ({ many, one }) => ({
  pingerPings: many(pingerPing),
  pingerProject: one(pingerProject, {
    fields: [
      pingerUrl.id,
    ],
    references: [
      pingerProject.id,
    ],
  }),
}))
