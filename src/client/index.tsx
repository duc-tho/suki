import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux'

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './core/config/ThemeConfig';

const root = ReactDOM.createRoot(
    document.getElementById('core') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </StrictMode>
        </Provider>
    </ThemeProvider>
);
