"use client"

import { FiSettings } from "react-icons/fi";
import { useStateContext } from '@/contexts/ContextProvider';

const SettingsButton: React.FC = () => {
    const {currentColor, themeSettings, setThemeSettings} = useStateContext();
    return (
        <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
            <button 
                type='button'
                className='text-3xl p-3 text-white hover:drop-shadow-xl hover:bg-light-gray'
                style={{background: currentColor, borderRadius: "50%"}}
                onClick={() => setThemeSettings(true)}
            >
                <FiSettings />
            </button>
        </div>
    )
}

export default SettingsButton;