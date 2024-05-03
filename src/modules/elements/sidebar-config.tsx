import { ROUTE_PATHS, SidebarMenuItemType } from 'constants-es';

import { NodeExpandOutlined } from '@ant-design/icons';
import { SiElementary } from "react-icons/si";

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

export const elementSidebarConfig: SidebarMenuItem[] = [
    {
        id: 'element',
        label: 'Elements',
        path: ROUTE_PATHS.ELEMENTS,
        type: SidebarMenuItemType.Item,
        icon: <SiElementary />,
        permissions: [],
        children: []
    }
];
