import { useRef } from 'react';

function useCurrentRefs<T>(items: T) {
    const refs = useRef<T>(items);
    refs.current = items;
    return refs;
}

export default useCurrentRefs;
