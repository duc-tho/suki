import { createRoot } from 'react-dom/client';
import './styles.scss';
import { store } from './store';
import { Provider } from 'react-redux'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './core/config/ThemeConfig';
import { SnackbarProvider } from 'notistack'
import Slide from '@mui/material/Slide';
import Loading from './components/Loading';
import Toast from './components/Toast';
import AppBackground from './components/AppBackground';
import { bootstrap } from './bootstrap';

const init = () => {
    bootstrap.excute();
}

createRoot(document.getElementById('core')!).render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <SnackbarProvider maxSnack={1} autoHideDuration={2000} TransitionComponent={props => <Slide {...props} direction="up" />}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
                <Loading />
                <Toast />
                <AppBackground useVideo init={init} />
            </SnackbarProvider>
        </Provider>
    </ThemeProvider>
);


