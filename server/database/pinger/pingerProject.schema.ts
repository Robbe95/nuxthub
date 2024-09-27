import { pingerUrl } from '@server/database/pinger/pingerUrl.schema'
import { primaryId } from '@server/database/uuid/primaryId.field'
import { relations } from 'drizzle-orm'
import {
  date,
  pgTable,
  text,
} from 'drizzle-orm/pg-core'

export const pingerProject = pgTable('pinger_project', {
  id: primaryId,
  createdAt: date('created_at').notNull().defaultNow(),
  name: text('name'),
})

export const pingerProjectRelations = relations(pingerProject, ({ many }) => ({
  pingerUrls: many(pingerUrl),
}))
