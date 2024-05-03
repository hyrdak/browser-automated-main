import { SidebarMenuItemType } from 'constants-es'

export interface SidebarMenuItem {
  id: string
  label: string
  pageTitle?: string
  type?: SidebarMenuItemType
  path?: string
  icon?: React.ReactElement
  permissions?: string[]
  children?: SidebarMenuItem[]
  breadcrumbInvisible?: boolean
  redirectPath?: string
}
