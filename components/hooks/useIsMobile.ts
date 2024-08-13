import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '@libs/breakpoints';

const useIsMobile = (breakpoint: number = MOBILE_BREAKPOINT) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= breakpoint);
            };

            handleResize();

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [setIsMobile, breakpoint]);

    return isMobile;
};

export default useIsMobile;
