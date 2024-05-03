import { ROUTE_PATHS, SidebarMenuItemType } from 'constants-es';

import { NodeExpandOutlined } from '@ant-design/icons';
import { GoWorkflow } from 'react-icons/go';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

export const workflowSidebarConfig: SidebarMenuItem[] = [
    {
        id: 'workflows',
        label: 'Workflows',
        path: ROUTE_PATHS.WORK_FLOWS,
        type: SidebarMenuItemType.Item,
        icon: <GoWorkflow />,
        permissions: [],
        children: [
            {
                id: 'workflows-detail',
                label: 'Workflows Detail',
                path: ROUTE_PATHS.WORK_FLOWS_DETAIL,
                type: SidebarMenuItemType.Item,
                icon: <NodeExpandOutlined />,
                permissions: [],
                children: []
            }
        ]
    }
];
