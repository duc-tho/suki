import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import { store } from './store';
import { Provider } from 'react-redux'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './core/config/ThemeConfig';
import { getToken } from 'firebase/messaging';
import { firebaseMessaging } from './services/firebase/Firebase';

createRoot(document.getElementById('core')!).render(
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

getToken(firebaseMessaging, { vapidKey: process.env.FB_VAPID_KEY }).then((data) => {
    console.log(data);
})
