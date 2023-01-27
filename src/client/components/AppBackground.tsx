import clsx from "clsx";
import { FunctionComponent, memo, useEffect } from "react";
import Particle from "./Particles";
import classes from "../assets/scss/modules/AppBackground.module.scss";
import { useDispatch } from "../store/hooks";
import { hide, show } from "../store/slices/LoadingSlice";
import { READY_STATE } from "../core/constants/Common";

const randomBGIndex: number = Math.floor(Math.random() * 5) + 1;
const randomVideoBGIndex: number = Math.floor(Math.random() * 8) + 1;
const background: string = `/images/background/bg-${randomBGIndex}.png`;
const videoBackgroundUri: string = `/videos/${randomVideoBGIndex}.mp4`;

type AppBackgroundProps = {
    useVideo?: boolean
    init: () => void
}

const AppBackground: FunctionComponent<AppBackgroundProps> = memo(({ useVideo, init }) => {
    const dispatch = useDispatch();
    const hideLoading = () => {
        dispatch(hide());
    };

    const onPlayHandle = () => {
        init();
        dispatch(show());

        const loadingInterval = setInterval(() => {
            if (document.readyState === READY_STATE.COMPLETE) {
                hideLoading();
                clearInterval(loadingInterval);
            }
        }, 500);
    }

    useEffect(() => {
        onPlayHandle();
    })

    return (
        <>
            <div id="appBackground" className={clsx(classes.wrap)}>
                {!!useVideo
                    ? <video loop autoPlay muted src={videoBackgroundUri}/>
                    : <img src={background} alt="App Background" />
                }
            </div>
            <Particle />
        </>
    );
})

export default AppBackground;
