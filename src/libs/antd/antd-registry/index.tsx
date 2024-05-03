import React from 'react';

import { createCache, StyleProvider } from '@ant-design/cssinjs';

const cache = createCache();

export const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
    return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
