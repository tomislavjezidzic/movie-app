import { useEffect } from 'react';
import useCurrentRefs from './useCurrentRefs';

const useOutsideClick = (
    ref: React.RefObject<any>,
    handler: (event: MouseEvent) => void,
    options: {
        trigger?: React.RefObject<any>;
    } = {}
) => {
    const currentRefs = useCurrentRefs({ options, handler });

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                !ref.current ||
                ref.current.contains(event.target) ||
                currentRefs.current.options.trigger?.current.contains(event.target)
            ) {
                return;
            }

            currentRefs.current.handler(event);
        };

        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, currentRefs]);
};

export default useOutsideClick;
