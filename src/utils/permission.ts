
import { SidebarMenuItemType } from 'constants-es'

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item'

import { toArray } from './transform'

export const hasPermission = (
  permissions: string | string[] | undefined,
  userPermissions: string[],
): boolean => {
  const nextPermission = toArray<string>(permissions)

  if (nextPermission.length === 0) {
    return true
  }

  return nextPermission.some((permission) =>
    userPermissions.includes(permission),
  )
}
export const getNavigationByUser = (
  navigation: SidebarMenuItem[],
  permissions: string[],
): SidebarMenuItem[] =>
  navigation.reduce<SidebarMenuItem[]>((result, navigationItem) => {
    if (
      navigationItem.type === SidebarMenuItemType.Item &&
      hasPermission(navigationItem.permissions, permissions)
    ) {
      return [...result, navigationItem]
    }

    if (
      [SidebarMenuItemType.Group, SidebarMenuItemType.Collapse].includes(
        navigationItem.type as SidebarMenuItemType,
      )
    ) {
      const navigationItemChildren = getNavigationByUser(
        navigationItem.children as SidebarMenuItem[],
        permissions,
      )

      if (navigationItemChildren.length !== 0) {
        const nextNavigationItem = {
          ...navigationItem,
          children: navigationItemChildren,
        }

        return [...result, nextNavigationItem]
      }
    }

    return result
  }, [])
