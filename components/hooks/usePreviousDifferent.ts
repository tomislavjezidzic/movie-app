import { useRef, useEffect } from 'react';

function usePreviousDifferent(currentValue: any) {
    const previousRef = useRef(null);
    const previousRef2 = useRef(null);

    useEffect(() => {
        previousRef2.current = previousRef.current;
        previousRef.current = currentValue;
    }, [currentValue]);

    return currentValue === previousRef.current ? previousRef2.current : previousRef.current;
}

export default usePreviousDifferent;
