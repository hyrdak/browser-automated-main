'use client';
import { ReactFlowProvider } from 'reactflow';
import { antdThemeConfig } from 'theme/antd/theme-config';

import { ConfigProvider } from 'antd';

import { StyledComponentsRegistry } from './antd';
import { ReactQueryProvider } from './react-query';
import { ReduxStoreProvider } from './redux';

export interface ProvidersProps {
    children: React.ReactNode;
}

function Providers(props: ProvidersProps): JSX.Element {
    return (
        <ReactQueryProvider>
            <ReactFlowProvider>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={antdThemeConfig}>
                        <ReduxStoreProvider>{props.children}</ReduxStoreProvider>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </ReactFlowProvider>
        </ReactQueryProvider>
    );
}

export default Providers;
