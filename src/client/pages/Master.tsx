import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import classes from '../assets/scss/modules/Master.module.scss';
import clsx from "clsx";
import BottomNavigation from "../components/BottomNavigation";

export const Master = () => {
    return (
        <div className={clsx(classes.wrap)}>
            <Header />
            <div className={clsx(classes.content)}>
                <Outlet />
            </div>
            <BottomNavigation />
        </div>
    )
}
