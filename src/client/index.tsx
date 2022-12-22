import { createRoot } from 'react-dom/client';
import './styles.scss';
import { store } from './store';
import { Provider } from 'react-redux'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './core/config/ThemeConfig';

createRoot(document.getElementById('core')!).render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
        </Provider>
    </ThemeProvider>
);


