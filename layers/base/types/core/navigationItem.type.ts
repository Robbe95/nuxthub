import type { Icon } from '@base/icons/icons'
import type { KeyboardShortcut } from '@base/types/core/keyboardShortcut.type'
import type {
  RouteLocationTyped,
  Routes,
} from '@base/types/core/routes.type.js'

export interface NavigationItemGroup {
  items: NavigationItemOption[]
  label: string
  type: 'group'
}

export interface NavigationItemOption {
  icon: Icon
  keyboardShortcut?: KeyboardShortcut
  label: string
  to: RouteLocationTyped<keyof Routes>
  type: 'option'
}

export type NavigationItem = NavigationItemGroup | NavigationItemOption
