import { Navigate, Outlet } from 'react-router-dom';
import { Master } from '../pages/Master';
import { ROUTES_INFO } from './RoutesInfo';

const {
    HOME, PROFILE, DAIRY, SCHEDULE,
    TOOL, TIKTOK_DOWNLOADER,
    RANDOM_IMAGE, LOGIN, NOT_FOUND
} = ROUTES_INFO;

const routes = (isLoggedIn: boolean) => [
    {
        path: HOME.path,
        element: isLoggedIn ? <Master /> : <Navigate to={`/${LOGIN.path}`} />,
        children: [
            { index: true, element: <>home</> },
            { path: PROFILE.path, element: <>profile</> },
            { path: DAIRY.path, element: <>dairy</> },
            { path: SCHEDULE.path, element: <>schedule</> },
            {
                path: TOOL.path,
                element: <Outlet />,
                children: [
                    { index: true, element: <>Tool</> },
                    { path: TIKTOK_DOWNLOADER.path, element: <>tiktok d</> },
                    { path: RANDOM_IMAGE.path, element: <>r image</> },
                ],
            },
        ],
    },
    { path: LOGIN.path, element: <>Login</> },
    { path: NOT_FOUND.path, element: <>Not found</> },
];

export default routes;
