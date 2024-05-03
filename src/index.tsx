import React from 'react';
import ReactDOM from 'react-dom/client';
import Providers from 'libs/providers';

import App from './App';

import 'assets/css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>
);
