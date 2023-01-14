import clsx from "clsx";
import { FunctionComponent } from "react";
import Particle from "./Particles";
import classes from "../assets/scss/modules/AppBackground.module.scss";

const randomBGIndex: number = Math.floor(Math.random() * 5) + 1;
const randomVideoBGIndex: number = Math.floor(Math.random() * 8) + 1;
const background: string = `/images/background/bg-${randomBGIndex}.png`;
const videoBackgroundUri: string = `/videos/${randomVideoBGIndex}.mp4`;

type AppBackgroundProps = {
    useVideo?: boolean
}

const AppBackground: FunctionComponent<AppBackgroundProps> = (props) => {
    console.log('123');

    return (
        <>
            <div id="appBackground" className={clsx(classes.wrap)}>
                {!!props.useVideo
                    ? <video loop autoPlay muted src={videoBackgroundUri}/>
                    : <img src={background} alt="App Background" />
                }
            </div>
            <Particle />
        </>
    );
}

export default AppBackground;
