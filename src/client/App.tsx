import { memo } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes/Route';
import classes from './assets/scss/modules/App.module.scss'
import clsx from 'clsx';

export const App = memo(() => {
    const routing = useRoutes(routes(true));

    return (
        <div className={clsx(classes.app)}>
            {routing}
        </div>
    );
});

export default App;
