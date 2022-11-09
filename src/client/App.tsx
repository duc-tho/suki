import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useRoutes } from 'react-router-dom';
import AppBackground from './components/AppBackground';
import Toast from './components/Toast';
import routes from './routes/Route';
import classes from './assets/scss/modules/App.module.scss'
import clsx from 'clsx';
import Loading from './components/Loading';

export const App = () => {
    const routing = useRoutes(routes(true));

    return (
        <>
            <div className={clsx(classes['app'])}>
                {routing}
            </div>
            <Loading />
            <Toast />
            <AppBackground />
        </>
    );
};

export default App;
