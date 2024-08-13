/**
 * This function allows you to set an interval in a functional component
 * @param {function} callback - The callback function
 * @param {number} delay - The delay between each interval
 */

import { useEffect } from 'react';

interface useIntervalProps {
    callback: () => void;
    delay: number;
    deps: any[];
}

const useInterval = ({ callback, delay = 1000, deps = [] }: useIntervalProps) => {
    useEffect(() => {
        const interval = setInterval(callback, delay);
        return () => clearInterval(interval);
    }, [callback, delay, deps]);
};

export default useInterval;
