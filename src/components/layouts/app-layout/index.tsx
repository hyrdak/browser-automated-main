import React, { Children, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'libs/redux';

import { Spin } from 'antd';
import { isEmpty } from 'lodash';

import { getAuth } from 'helpers/auth';
import { setAuthUser } from 'data/store';
import { useQueryUserProfile } from 'modules/auth/data/queries/use-query-user-profile';

type Props = {
    children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
    const dispatch = useAppDispatch();

    const { data: adminUserProfile, isFetching: isLoadingAdminUserProfile, isFetched } = useQueryUserProfile();

    useEffect(() => {
        if (!isEmpty(adminUserProfile?.data)) {
            dispatch(
                setAuthUser({
                    user: adminUserProfile?.data
                })
            );
        }
    }, [dispatch, adminUserProfile?.data]);

    if (isLoadingAdminUserProfile && !isFetched && !adminUserProfile?.data) {
        return <Spin fullscreen />;
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default AppLayout;
