import clsx from "clsx";
import classes from '../assets/scss/modules/Loading.module.scss'
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "../store/hooks";
import { hide, selectLoading } from "../store/slices/LoadingSlice";
import { MENHERA } from "../core/constants/File";

const randomStickerIndex: number = Math.floor(Math.random() * MENHERA.length);
const sticker: string = require(`../assets/images/menhera/${MENHERA[randomStickerIndex]}`);

const Loading: FunctionComponent = () => {
    const { open } = useSelector(selectLoading);
    const dispatch = useDispatch();
    const [stickerLoaded, setStickerLoaded] = useState(false);
    const handleStickerLoad = () => setStickerLoaded(true);

    window.onload = () => {
        open && dispatch(hide());
    };

    return (
        <div className={clsx(classes.wrap)}>
            <Backdrop
                sx={{ color: '#FFF', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                className={clsx(classes.loading)}
            >
                <img className={clsx(classes.sticker, stickerLoaded && classes.active)}
                    src={sticker} alt="Menhera Sticker" onLoad={handleStickerLoad}
                />

                <div className={clsx(classes.content)}>
                    <CircularProgress size={12} color="info" />
                    <Typography fontSize={15}>&nbsp;Chờ xíu</Typography>
                </div>
            </Backdrop>
        </div>
    );
}

export default Loading;
