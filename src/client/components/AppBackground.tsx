import clsx from "clsx";
import { FunctionComponent, useEffect, useRef, useState, SyntheticEvent, useCallback } from "react";
import Particle from "./Particles";
import classes from "../assets/scss/modules/AppBackground.module.scss";
import useWiggle from "../core/hooks/useWiggle";

const randomBGIndex: number = Math.floor(Math.random() * 5) + 1;
const background: string = require(`../assets/images/background/bg-${randomBGIndex}.png`);

const AppBackground: FunctionComponent = () => {
    const imgRef = useRef<HTMLImageElement>(null);
    const { x, y, interval } = useWiggle([-10, 10], [4000, 6000]);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const wiggleImage = useCallback(() => {
        if (imgRef.current) {
            if (!width || !height) return;

            imgRef.current.style.transform = `translate(-${50 + (x / width) * 100}%, -${50 + (y / height) * 100}%) scale(1.1)`;
            imgRef.current.style.transition = `${interval / 1000}s 0s ease-in-out`;
        }
    }, [x, y, width, height, interval]);

    const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        setWidth(event.currentTarget.width);
        setHeight(event.currentTarget.height);
    }

    useEffect(() => {
        wiggleImage();
    }, [wiggleImage]);

    return (
        <>
            <div className={clsx(classes.wrap)}>
                <img src={background} alt="App Background" ref={imgRef} onLoad={handleLoad} />
            </div>
            <Particle />
        </>
    );
}

export default AppBackground;
