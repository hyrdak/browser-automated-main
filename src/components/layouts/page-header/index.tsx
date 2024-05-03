import { memo, useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageHeaderDOMId } from 'constants-es';
import { useCheckPathMatched } from 'hooks';
import { useAppDispatch } from 'libs/redux';
import { findItemInNestedArray } from 'utils';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Tooltip, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';

import { SidebarMenuItem } from 'interfaces/sidebar-menu-item';
import { setPageMetadata } from 'data/store';
import { usePageMetadata } from 'data/store/page-metadata/use-page-metadata';

export interface PageHeaderProps {
    sidebarConfig: SidebarMenuItem[];
}

function PageHeader({ sidebarConfig }: PageHeaderProps): JSX.Element {
    const router = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const pageMetadata = usePageMetadata(pathname);
    const { checkPathMatched } = useCheckPathMatched();

    const menuItemSelected = useMemo(() => {
        return findItemInNestedArray<(path: string) => boolean, SidebarMenuItem>(
            sidebarConfig,
            'path',
            checkPathMatched
        );
    }, [checkPathMatched, sidebarConfig]);

    const handleGoBack = useCallback(() => {
        router(-1);
    }, [router]);

    useEffect(() => {
        dispatch(
            setPageMetadata({
                pathname,
                data: {
                    title: menuItemSelected?.pageTitle ?? menuItemSelected?.label ?? 'Browser Automated',
                    headerTitle: menuItemSelected?.pageTitle ?? menuItemSelected?.label
                }
            })
        );
    }, [dispatch, menuItemSelected?.label, menuItemSelected?.pageTitle, pathname]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between h-auto px-4">
                <Typography.Text className="text-xl " strong>
                    <span className="flex items-center">
                        {!!pageMetadata.shouldShowGoBack && (
                            <Tooltip title="Go back" className="inline-flex mr-2 hover:cursor-pointer">
                                <AiOutlineArrowLeft onClick={handleGoBack} />
                            </Tooltip>
                        )}
                        {pageMetadata.title}
                    </span>
                    <small className="block">{pageMetadata.headerSubTitle}</small>
                </Typography.Text>
                {pageMetadata.hasExtra && <div className="flex items-center ml-auto" id={PageHeaderDOMId.Extra} />}
            </div>

            {pageMetadata.hasTag ? <div id={PageHeaderDOMId.Tag} /> : undefined}
            {pageMetadata.hasFooter && <div id={PageHeaderDOMId.Footer} />}
        </div>
    );
}

export default memo(PageHeader);
