import type { Icon } from '@base/icons/icons'

export interface StepItem {
  id: number
  title: string
  isCompleted?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  description?: string
  icon?: Icon
}
