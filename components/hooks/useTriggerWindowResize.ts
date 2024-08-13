import { useCallback } from 'react';

const useTriggerWindowResize = () =>
    useCallback(() => {
        if (typeof window !== 'undefined') {
            if (typeof Event === 'function') {
                // modern browsers
                window.dispatchEvent(new Event('resize'));
            } else {
                // for IE and other old browsers
                // causes deprecation warning on modern browsers
                const evt = window.document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
            }
        }
    }, []);

export default useTriggerWindowResize;
