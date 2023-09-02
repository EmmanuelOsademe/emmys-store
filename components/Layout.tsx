import { useStateContext } from "@/contexts/ContextProvider";
import Nav from "./Nav";
import SettingsButton from "./SettingsButton";
import Sidebar from "./Sidebar";
import ThemeSetting from "./ThemeSetting";


const Layout: React.FC<Prop> = ({children}) => {
    const {activeMenu} = useStateContext();

    return (
        <>
            <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                <SettingsButton />
            </div>
            {activeMenu ? (
                <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white border-solid border-x-1 border-gray-400'>
                    <Sidebar />
                </div>
            ) : (
                <div className='w-0 sidebar dark:bg-secondary-dark-bg border-solid border-x-1 border-gray-400'>
                    <Sidebar />
                </div>
            )}
            
            <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg w-full">
                    <Nav />
                </div>
                <ThemeSetting />
                {children}
            </div>
        </>
    )
}

interface Prop {
    children: React.ReactNode
}

export default Layout;