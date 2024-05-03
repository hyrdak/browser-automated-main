import { flatten } from 'lodash';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

import { elementSidebarConfig } from './elements';
import { nodeSidebarConfig } from './nodes';
import { workflowSidebarConfig } from './work-flows';

export const sidebarConfigs: SidebarMenuItem[] = flatten([workflowSidebarConfig, nodeSidebarConfig ]);
