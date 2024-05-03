import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'libs/redux';
import { cx } from 'utils';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Divider, FloatButton, Layout, message, theme } from 'antd';
import { VscSignOut } from 'react-icons/vsc';
import { isEmpty } from 'lodash';

import { removeAuth } from 'helpers/auth';
import { resetAuth, setAuthUser } from 'data/store';
import { useUIConfig } from 'data/store/ui-config/use-ui-config';
import { useMutationLogout } from 'modules/auth/data/queries';
import { useQueryUserProfile } from 'modules/auth/data/queries/use-query-user-profile';
import { sidebarConfigs } from 'modules/sidebar-config';
import ValidateScreen from 'components/HOC/validate-screen';

import PageHeader from '../page-header';
import SidebarMenu from '../sidebar-menu';

const { Header, Sider, Content } = Layout;

type Props = {
    children: React.ReactNode | React.ReactNode[];
};

const PrivateLayout = ({ children }: Props) => {
    const { isSmallScreen } = useUIConfig();
    const [collapsed, setCollapsed] = useState(isSmallScreen);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data: adminUserProfile, isFetching: isLoadingAdminUserProfile, isFetched } = useQueryUserProfile();
    const user = adminUserProfile?.data;

    useEffect(() => {
        if (!isEmpty(adminUserProfile?.data)) {
            dispatch(
                setAuthUser({
                    user: adminUserProfile?.data
                })
            );
        }
    }, [dispatch, adminUserProfile?.data]);

    const mutationLogout = useMutationLogout();
    const handleLogout = useCallback(() => {
        // if (isAdminRoute) {

        mutationLogout.mutate(undefined, { 
            onSuccess: (response: any) => {
                removeAuth();
                dispatch(resetAuth());
            },
            onError: (error: any) => {
                message.error(error.message);
            }
        });
    }, [dispatch, mutationLogout]);

    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    return (
        <ValidateScreen>
            <Layout>
                <Sider
                    width={256}
                    // trigger={null}
                    // collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    style={{
                        overflow: 'auto',
                        height: 'calc(100vh)',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        background: colorBgContainer
                    }}
                    className="shadow-lg"
                >
                    <div className="w-full text-center border-r border-[#f1f1f1]">
                        <img
                            src={collapsed ? '/logo200x200.png' : '/logo2000x400.png'}
                            alt={collapsed ? 'logo200x200.png' : 'logo2000x400.png'}
                            className={cx('w-16 h-16 object-contain', {
                                '!w-[200px] !h-[64px] ': !collapsed
                            })}
                        />
                    </div>
                    <Divider className="!my-0 border-[#f1f1f1]" orientation="right">
                        <span
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 transition-all hover:cursor-pointer hover:bg-slate-100 hover:rounded-full "
                        >
                            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </span>
                    </Divider>
                    <div className="w-full p-3 border-[#f1f1f1]">
                        <div
                            className={cx('flex items-end  w-full ', {
                                'justify-center': collapsed,
                                'justify-between': !collapsed
                            })}
                            onClick={handleLogout}
                        >
                            {' '}
                            <div className="flex items-end">
                                {' '}
                                <Avatar
                                    size={32}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                ></Avatar>{' '}
                                <span
                                    title={user?.email}
                                    className={cx('truncate w-3/4 inline-block', {
                                        hidden: !!collapsed,
                                        'ml-3s': !collapsed
                                    })}
                                >
                                    {user?.email}
                                </span>
                            </div>
                            <span
                                title="logout"
                                className={cx(' hover:cursor-pointer', {
                                    hidden: !!collapsed,
                                    'mr-3': !collapsed,
                                    '!hover:cursor-wait': mutationLogout.isPending
                                })}
                            >
                                {' '}
                                <VscSignOut size={16} />
                            </span>
                        </div>
                    </div>
                    <Divider className="!my-0 border-[#f1f1f1]" orientation="right" />
                    <SidebarMenu sidebarConfig={sidebarConfigs} userPermissions={[]} />
                </Sider>
                <Layout
                    className={cx('transition-all', {
                        'ml-[256px]': !collapsed,
                        'ml-[80px]': collapsed
                    })}
                >
                    <Header
                        style={{ padding: 0, background: colorBgContainer }}
                        className="flex items-center justify-center w-full bg-white border-b border-gray-300"
                    >
                        <PageHeader sidebarConfig={sidebarConfigs} />
                    </Header>
                    <Content
                        style={{
                            // margin: '0 16px',
                            padding: '16px 16px 0 16px',
                            minHeight: 'calc(100vh - 64px )',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                    >
                        {children}
                        <FloatButton.BackTop />
                    </Content>
                </Layout>
            </Layout>
        </ValidateScreen>
    );
};

export default PrivateLayout;
