import { ROUTES_INFO } from './../../routes/RoutesInfo';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

type RouteInfo = {
    name: string,
    shortName: string,
    path: string,
}

export default function useRouteInfo(): RouteInfo | null {
    const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
    const location = useLocation();

    const getRouteInfo = useCallback(() => {
        const result = Object.values(ROUTES_INFO).find((routeInfo: RouteInfo) => {
            if (location.pathname === ROUTES_INFO.HOME.path) return true;

            const pathNames = location.pathname
                .split('/')
                .filter(pathname => pathname !== '');

            return routeInfo.path === pathNames[pathNames.length - 1];
        });

        setRouteInfo(result ?? null)
    }, [location.pathname]);

    useEffect(() => {
        getRouteInfo();
    }, [getRouteInfo]);

    return routeInfo;
}
