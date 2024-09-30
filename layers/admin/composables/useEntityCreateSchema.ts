import type { z } from 'zod'

interface SchemaTreeItem {
  name: string
  label: string
  type: string
  children: SchemaTreeItem[]
}

export function useEntityCreateSchema<TSchema extends z.ZodSchema>(schema: TSchema) {
  return schema
}
