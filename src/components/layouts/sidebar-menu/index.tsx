import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SidebarMenuItemType } from 'constants-es';
import { useCheckPathMatched, usePrevious } from 'hooks';
import { findItemInNestedArray, getParentsOfItemInNestedArray } from 'utils';

import { FileOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import clsx from 'clsx';
import { isEqual, last } from 'lodash';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';
import { useUserSidebar } from 'hooks/use-user-sidebar';

import getMenuItems from './render-menu';

export interface SidebarMenuProps {
    isSmallScreen?: boolean;
    isSidebarCollapsed?: boolean;
    sidebarConfig: SidebarMenuItem[];
    userPermissions: string[];
}

function SidebarMenu({
    isSmallScreen = false,
    isSidebarCollapsed,
    sidebarConfig,
    userPermissions
}: SidebarMenuProps): JSX.Element {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [shouldAddDefaultOpenKeys, setShouldAddDefaultOpenKeys] = useState(true);
    const [isMenuOpening, setIsMenuOpening] = useState(false);

    const navigationByUser = useUserSidebar(sidebarConfig, userPermissions);
    const { pathname } = useLocation();
    const params = useParams();
    const previousPathname = usePrevious(pathname);
    const previousParams = usePrevious(params);
    const { checkPathMatched } = useCheckPathMatched();

    const shouldMenuExpanded = isMenuOpening || !isSidebarCollapsed;

    const menuItems = useMemo(() => getMenuItems(navigationByUser), [navigationByUser]);

    const handleOpenMenu = useCallback(
        (nextOpenKeys: string[]) => {
            setIsMenuOpening(nextOpenKeys.length > 0);

            if (shouldAddDefaultOpenKeys) {
                setShouldAddDefaultOpenKeys(false);
                setOpenKeys((openKeys) => [...openKeys, ...nextOpenKeys]);
            } else {
                setOpenKeys([...nextOpenKeys]);
            }
        },
        [shouldAddDefaultOpenKeys]
    );

    useEffect(() => {
        if (previousPathname === pathname && isEqual(previousParams, params)) {
            return;
        }

        const menuItemSelected = findItemInNestedArray<(path: string) => boolean>(
            sidebarConfig,
            'path',
            checkPathMatched
        );

        if (menuItemSelected) {
            const parentsOfItemSelected = getParentsOfItemInNestedArray<(path: string) => boolean>(
                sidebarConfig,
                ['path'],
                checkPathMatched
            ).parents;
            const parentIds = parentsOfItemSelected.map((parent) => parent.id);
            const selectedKey =
                menuItemSelected.breadcrumbInvisible || menuItemSelected.type === SidebarMenuItemType.Route
                    ? last(parentIds)
                    : menuItemSelected.id;

            setSelectedKeys([selectedKey]);
            setOpenKeys(parentIds);
        }
    }, [checkPathMatched, params, pathname, previousParams, previousPathname, sidebarConfig]);

    return (
        <Menu
            theme="light"
            mode="inline"
            // className={clsx({
            //     'h-[calc(100vh-64px-110px)] overflow-auto': !isSmallScreen
            // })}
            className="h-[calc(100vh-64px-110px)] overflow-auto"
            openKeys={shouldMenuExpanded ? openKeys : []}
            selectedKeys={selectedKeys}
            items={menuItems}
            triggerSubMenuAction="click"
            // overflowedIndicatorPopupClassName="overflowed-indicator-popup"
            style={{
                fontWeight: 600
            }}
            onOpenChange={handleOpenMenu}
        />
    );
}

export default memo(SidebarMenu);
