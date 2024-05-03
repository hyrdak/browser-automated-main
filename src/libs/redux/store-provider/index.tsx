import { Provider } from 'react-redux';

import { reduxStore } from '../store';

export interface StoreProviderProps {
    children: React.ReactNode;
}

export function ReduxStoreProvider({ children }: StoreProviderProps): JSX.Element {
    return <Provider store={reduxStore}>{children}</Provider>;
}
