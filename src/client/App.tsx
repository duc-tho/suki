import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import AppBackground from './components/AppBackground';
import Toast from './components/Toast';
import routes from './routes/Route';
import classes from './assets/scss/modules/App.module.scss'
import clsx from 'clsx';
import Loading from './components/Loading';
import { bootstrap } from './bootstrap';
import { useDispatch } from './store/hooks';
import { show } from './store/slices/LoadingSlice';

export const App = () => {
    const routing = useRoutes(routes(true));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(show());
        bootstrap.excute();
    }, []);

    return (
        <>
            <div className={clsx(classes.app)}>
                {routing}
            </div>
            <Loading />
            <Toast />
            <AppBackground useVideo />
        </>
    );
};

export default App;
