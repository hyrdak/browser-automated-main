import { ROUTE_PATHS, SidebarMenuItemType } from 'constants-es';

import { NodeExpandOutlined } from '@ant-design/icons';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

export const nodeSidebarConfig: SidebarMenuItem[] = [
    {
        id: 'nodes',
        label: 'Nodes',
        path: ROUTE_PATHS.NODES,
        type: SidebarMenuItemType.Item,
        icon: <NodeExpandOutlined />,
        permissions: [],
        children: []
    }
];
