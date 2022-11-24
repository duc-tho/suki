import classes from "../assets/scss/modules/BottomNavigation.module.scss";
import { BottomNavigation as Navigation, BottomNavigationAction } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { SyntheticEvent, useEffect } from "react";
import WindowIcon from '@mui/icons-material/Window';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotesIcon from '@mui/icons-material/Notes';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import clsx from "clsx";
import { useDispatch, useSelector } from "../store/hooks";
import { selectNavigationTab, setTab } from "../store/slices/NavigationTabSlice";
import { ROUTES_INFO } from "../routes/RoutesInfo";

const BottomNavigation = () => {
    const location = useLocation();
    const { tab } = useSelector(selectNavigationTab);
    const dispatch = useDispatch();
    const handleChange = (event: SyntheticEvent, newValue: string) => { dispatch(setTab(newValue)) };
    const pathMap = {
        home: `${ROUTES_INFO.HOME.path}`,
        tool: `/${ROUTES_INFO.TOOL.path}`,
        schedule: `/${ROUTES_INFO.SCHEDULE.path}`,
        dairy: `/${ROUTES_INFO.DAIRY.path}`,
    };

    useEffect(() => {
        const currentTab = location.pathname.split('/')[1];

        if(currentTab) {
            dispatch(setTab(`/${currentTab}` ?? pathMap.home));
        }
    }, [location]);

    return (
        <Navigation
            value={tab}
            onChange={handleChange}
            className={clsx(classes.stickyNavigation)}
        >
            <BottomNavigationAction
                className={clsx(classes.stickyNavigation__button)}
                component={Link}
                to={pathMap.home}
                value={pathMap.home}
                label={ROUTES_INFO.HOME.shortName}
                icon={<WindowIcon />}
            />
            <BottomNavigationAction
                className={clsx(classes.stickyNavigation__button)}
                component={Link}
                to={pathMap.tool}
                value={pathMap.tool}
                label={ROUTES_INFO.TOOL.name}
                icon={<ArchitectureIcon />}
            />
            <BottomNavigationAction
                className={clsx(classes.stickyNavigation__button)}
                component={Link}
                to={pathMap.schedule}
                value={pathMap.schedule}
                label={ROUTES_INFO.SCHEDULE.shortName}
                icon={<CalendarMonthIcon />}
            />
            <BottomNavigationAction
                className={clsx(classes.stickyNavigation__button)}
                component={Link}
                to={pathMap.dairy}
                value={pathMap.dairy}
                label={ROUTES_INFO.DAIRY.shortName}
                icon={<NotesIcon />}
            />
        </Navigation>
    );
};

export default BottomNavigation;
