import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'libs/redux';

import { Grid } from 'antd';

import { useUIConfig } from 'data/store/ui-config/use-ui-config';

type Props = {
    children?: any;
};

const ValidateScreen = (props: Props) => {
    const { setUIConfig } = useUIConfig();

    const dispatch = useAppDispatch();
    const screens = Grid.useBreakpoint();

    const handleAdjustSidebar = useCallback(() => {
        const isSmallScreen = (!!screens.sm || !!screens.xs || !!screens.md) && !screens.lg;

        setUIConfig({
            key: 'isSidebarCollapsed',
            value: isSmallScreen || !!screens.xl || !!screens.lg
        });
        setUIConfig({
            key: 'isSmallScreen',
            value: isSmallScreen
        });
    }, [screens, setUIConfig]);

    useEffect(() => {
        handleAdjustSidebar();
    }, [handleAdjustSidebar]);

    return <>{props.children}</>;
};

export default ValidateScreen;
