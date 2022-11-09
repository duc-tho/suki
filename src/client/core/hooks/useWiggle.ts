import { useState, useEffect } from 'react';
import { getRandomInteger } from "../utils/NumberUtil";

export default function useWiggle(wiggleRange: [min: number, max: number], intervalRange: [iMin: number, iMax: number]): { x: number, y: number, interval: number } {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [intervalTime, setintervalTime] = useState(1000);

    const [min, max] = wiggleRange;
    const [iMin, iMax] = intervalRange;

    useEffect(() => {
        const wiggleInterval = setTimeout(() => {
            setX(getRandomInteger(min, max));
            setY(getRandomInteger(min, max));
            setintervalTime(getRandomInteger(iMin, iMax));
        }, intervalTime);

        return () => { clearTimeout(wiggleInterval) }
    }, [intervalTime]);

    return { x, y, interval: intervalTime };
}
