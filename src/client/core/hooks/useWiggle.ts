import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { getRandomInteger } from "../utils/NumberUtil";

export default function useWiggle(wiggleRange: [min: number, max: number], intervalRange: [iMin: number, iMax: number]): { x: number, y: number, interval: number } {
    const x = useRef(0);
    const y = useRef(0);
    const intervalTime = useRef(1000);

    const [min, max] = wiggleRange;
    const [iMin, iMax] = intervalRange;

    useEffect(() => {
        const wiggleInterval = setTimeout(() => {
            x.current = getRandomInteger(min, max);
            y.current = getRandomInteger(min, max);
            intervalTime.current = getRandomInteger(iMin, iMax);
        }, intervalTime.current);

        return () => { clearTimeout(wiggleInterval) }
    }, [intervalTime]);

    return { x: x.current, y: y.current, interval: intervalTime.current };
}
