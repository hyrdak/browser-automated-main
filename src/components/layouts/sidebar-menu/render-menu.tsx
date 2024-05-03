import { Link } from 'react-router-dom';
import { SidebarMenuItemType } from 'constants-es';

import { MenuProps } from 'antd';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';

type MenuItem = Required<MenuProps>['items'][number];

const getMenuItem = ({ children, icon, id, path, label, type }: SidebarMenuItem): MenuItem => {
    const menuChildren = (children?.length ?? 0) > 0 ? children?.map((menu) => getMenuItem(menu)) : ([] as MenuItem[]);

    if (type === SidebarMenuItemType.Collapse) {
        return {
            key: id,
            icon,
            label,
            children: menuChildren
        };
    }

    if (type === SidebarMenuItemType.Group) {
        return {
            key: id,
            label,
            children: menuChildren,
            type: 'group'
        };
    }

    return {
        key: id,
        icon,
        label: (
            <Link to={path as string} title={label}>
                {label}
            </Link>
        )
    };
};

const getMenuItems = (navigation: SidebarMenuItem[]) => {
    const items = navigation.map((navigationItem) => getMenuItem(navigationItem));

    return items;
};

export default getMenuItems;
