import { useMemo } from 'react';
import { getNavigationByUser } from 'utils';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

export function useUserSidebar(sidebarConfig: SidebarMenuItem[], userPermissions: string[]) {
    // const userAuth = useUserAuth()

    const navigationByUser = useMemo(
        // () => getNavigationByUser(adminSidebarConfigs, userAuth.permissions),
        () => getNavigationByUser(sidebarConfig, userPermissions),
        [sidebarConfig, userPermissions]
    );

    return navigationByUser;
}
