'use client';
import { createContext, useEffect, useState } from 'react';

type typeTema = 'dark' | '';

interface AppContextProps {
    tema?: typeTema;
    alternarTema?: () => void;
}

const AppContext = createContext<AppContextProps>({});

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [tema, setTema] = useState<typeTema>('dark');

    function handleTema() {
        const novoTema = tema === '' ? 'dark' : '';
        setTema(novoTema);
        localStorage.setItem('tema', novoTema);
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema');
        if (temaSalvo === 'dark' || temaSalvo === '') setTema(temaSalvo);
    }, []);

    return (
        <AppContext.Provider
            value={{
                tema: tema,
                alternarTema: handleTema,
            }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;
