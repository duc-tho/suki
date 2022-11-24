import { ButtonBase, Typography } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import classes from '../assets/scss/modules/Header.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import useRouteInfo from "../core/hooks/useRouteInfo";
import { useNavigate } from "react-router-dom";
import { ROUTES_INFO } from "../routes/RoutesInfo";

const Header: FunctionComponent = () => {
    const currentRoute = useRouteInfo();
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(ROUTES_INFO.HOME.path)
    }

    return (
        <div className={clsx(classes.wrap)}>
            <ButtonBase className={clsx(classes.back)} onClick={handleBackButtonClick}>
                <HomeIcon className={clsx(currentRoute?.path === ROUTES_INFO.HOME.path && classes.active)} />
            </ButtonBase>
            <div className={clsx(classes.title)}>
                <Typography>{currentRoute?.name ?? 'Trang không có tiêu đề'}</Typography>
            </div>
        </div>
    );
}

export default Header;
