import type { Icon } from '@base/icons/icons'
import type { KeyboardShortcut } from '@base/types/core/keyboardShortcut.type'
import type { RouteLocationRaw } from 'vue-router'

export interface NavigationItemGroup {
  items: NavigationItemOption[]
  label: string
  type: 'group'
}

export interface NavigationItemOption {
  icon: Icon
  keyboardShortcut?: KeyboardShortcut
  label: string
  to: RouteLocationRaw
  type: 'option'
}

export type NavigationItem = NavigationItemGroup | NavigationItemOption
