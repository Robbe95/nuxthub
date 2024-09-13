import type { Icon } from '@base/icons/icons'
import type { RouteLocationNamedRaw } from 'vue-router'

export interface BreadcrumbRoute {
  icon?: Icon
  label?: string
  to: RouteLocationNamedRaw
  type: 'route'
}

export interface BreadcrumbEllipsis {
  items: BreadcrumbRoute[]
  type: 'ellipsis'
}

export interface BreadcrumbCurrentRoute {
  icon?: Icon
  label?: string
  type: 'page'
}

export type BreadcrumbItem = BreadcrumbCurrentRoute | BreadcrumbEllipsis | BreadcrumbRoute
