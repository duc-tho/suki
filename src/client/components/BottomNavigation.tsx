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

const BottomNavigation = () => {
    const { tab } = useSelector(selectNavigationTab);
    const dispatch = useDispatch();
    const handleChange = (event: SyntheticEvent, newValue: string) => { dispatch(setTab(newValue)) };
    const pathMap = {
        home: "/",
        tool: "/tool",
        schedule: "/schedule",
        dairy: "/dairy",
    };

    useLocation();

    useEffect(() => { setTab(window.location.pathname) }, []);

    return (
        <Navigation
            value={tab}
            onChange={handleChange}
            className={clsx(classes['stickyNavigation'])}
        >
            <BottomNavigationAction
                className={clsx(classes['stickyNavigation__button'])}
                component={Link}
                to={pathMap.home}
                value={pathMap.home}
                label="Home"
                icon={<WindowIcon />}
            />
            <BottomNavigationAction
                className={clsx(classes['stickyNavigation__button'])}
                component={Link}
                to={pathMap.tool}
                value={pathMap.tool}
                label="Công cụ"
                icon={<ArchitectureIcon />}
            />
            <BottomNavigationAction
                className={clsx(classes['stickyNavigation__button'])}
                component={Link}
                to={pathMap.schedule}
                value={pathMap.schedule}
                label="TKB"
                icon={<CalendarMonthIcon />}
            />
            <BottomNavigationAction
                className={clsx(classes['stickyNavigation__button'])}
                component={Link}
                to={pathMap.dairy}
                value={pathMap.dairy}
                label="Nhật Ký"
                icon={<NotesIcon />}
            />
        </Navigation>
    );
};

export default BottomNavigation;
