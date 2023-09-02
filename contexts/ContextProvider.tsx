"use client"

import React, {useState, useContext, createContext} from 'react';

interface ContextProviderProps {
    children: React.ReactNode
}

const initialState = {
    cart: false,
    chat: false,
    notification: false,
    userProfile: false
}

const useValue = () => {
    const [currentColor, setCurrentColor] = useState<string>('#03C9D7');
    const [currentMode, setCurrentMode] = useState<string>('Light');
    const [themeSettings, setThemeSettings] = useState<boolean>(false);
    const [activeMenu, setActiveMenu] = useState<boolean>(true);
    const [isClicked, setIsClicked] = useState<typeof initialState>(initialState);

    const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMode(e.target.value);
        setThemeSettings(false);
        localStorage.setItem('themeMode', e.target.value);
    }

    const setColor = (color: string) => {
        setCurrentColor(color);
        setThemeSettings(false);
        localStorage.setItem('colorMode', color);
    }

    const handleClick = (clicked: string): void => {
        setIsClicked({...initialState, [clicked]: true})
    }

    return {
        currentColor, setCurrentColor, currentMode, setMode, themeSettings, setColor, setThemeSettings,
        activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick
    }
}

const StateContext = createContext({} as ReturnType<typeof useValue>);


export const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
    return(
        <StateContext.Provider value={useValue()}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);