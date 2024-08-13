'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '@hooks/useLocalStorage';

const AppContext = createContext<any>({
    ids: [],
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState({
        ids: [],
    });

    useEffect(() => {
        const storageIds = useLocalStorage('favorite_movies');
        const values = storageIds?.value !== null ? storageIds : { value: [] };
        setState({
            ids: values.value,
        });
    }, []);

    return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    return useContext(AppContext);
}
