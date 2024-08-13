import { useEffect, useState } from 'react';

const useWindowScrollPosition = () => {
    const [position, setPosition] = useState({ scrollX: 0, scrollY: 0 });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                setPosition({
                    scrollY: window.pageYOffset,
                    scrollX: window.pageXOffset,
                });
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [setPosition]);

    return position;
};

export default useWindowScrollPosition;
