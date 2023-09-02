"use client"

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider} from "next-auth/react";
import {HelpOutlineOutlined, SearchOutlined, ShoppingCartOutlined} from "@mui/icons-material";
import {TooltipComponent} from "@syncfusion/ej2-react-popups";
import {FiShoppingCart} from "react-icons/fi";
import {BsChatLeft} from "react-icons/bs"
import {RiNotification3Line} from "react-icons/ri";
import {AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai';
import {MdOutlinePerson} from "react-icons/md"
import { useStateContext } from "@/contexts/ContextProvider";

const Nav: React.FC = () => {
    const [logIn, setLogIn] = useState<boolean>(false);
    const {data: session} = useSession();
    const [providers, setProviders] = useState<Awaited<ReturnType<typeof getProviders>>>(null);
    const {activeMenu, setActiveMenu, isClicked, handleClick, currentColor} = useStateContext();

    useEffect(() => {
        const fetchProviders = async (): Promise<void> => {
            try {
                const response = await getProviders();
                setProviders(response);
            } catch (e: any) {
                console.log(e.message);
            }
        }

        fetchProviders();
    }, []);

    console.log(session);

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    return (
        <nav className="flex justify-between  bg-slate-100 border-solid border-y-2 border-gray-400 p-2 relative">

            {/* Desktop Navigation */}
            <NavButton 
                title="Menu"
                customFunc={handleActiveMenu}
                color={currentColor}
                icon={<AiOutlineMenu />}
            />

            <div className="sm:flex hidden">
                <div className="flex h-full items-center justify-center gap-1 ">
                    <input 
                        type="text" 
                        placeholder="Search for Products Here"
                        name="searchQuery"
                        className="w-80 h-4/5 flex justify-center items-center text-center border-solid border-2 rounded-lg border-gray-500 align-middle text-lg text-gray-500 outline-1 "
                    />
                    <button
                        type="button"
                        onClick={() => {}}
                        style={{backgroundColor: currentColor}}
                        className="font-bold rounded-full text-white h-4/5 w-20 hover:cursor-pointer"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="flex">
                <NavButton 
                    title="Cart"
                    customFunc={() => handleClick('cart')}
                    color={currentColor}
                    icon={<FiShoppingCart />}
                    
                />
                <NavButton 
                    title="Chat"
                    customFunc={() => handleClick('chat')}
                    color={currentColor}
                    icon={<BsChatLeft />}
                    
                />
                <NavButton 
                    title="Notifications"
                    customFunc={() => handleClick('notification')}
                    color={currentColor}
                    icon={<RiNotification3Line />}
                    
                />

                {session?.user ? (
                    <div 
                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick('profile')}
                    >
                        <Link href="/profile">
                            <Image 
                                src={session.user.image as string}
                                alt="Profile picture"
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                        </Link>
                        <p>
                            <span className="text-gray-400 text-14">Hi</span>
                            <span className="text-gray-400 font-bold ml-1 text-14">{session.user.name.split(" ")[0]}</span>
                        </p>
                    </div>
                ) : (
                    <NavButton 
                        title="Sign In"
                        customFunc={() => setLogIn(true)}
                        color={currentColor}
                        icon={<MdOutlinePerson />}
                    />
                )}
            </div>

            {logIn && !session && 
                    <div className="fixed top-10 font-bold right-0 dark:bg-secondary-dark-bg bg-slate-100 w-60 h-auto mt-8 mb-8">
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <div key={provider.name} className="flex items-center gap-2 hover:cursor-pointer">
                                <NavButton 
                                    title={provider.name}
                                    customFunc={() => signIn(provider.id)}
                                    color={currentColor}
                                    icon={<MdOutlinePerson />}
                                />
                                {`Sign in with ${provider.name}`}
                            </div>
                        ))
                    }
                </div>
            }
        </nav>
    )
}

export default Nav;

interface Props {
    title: string;
    customFunc: () => void;
    icon: React.ReactElement;
    color: string;
    dotColor?: string;
    backgroundColor?: string
}

const NavButton: React.FC<Props> = ({title, customFunc, icon, color, dotColor, backgroundColor}) => {

    return (
        <TooltipComponent
            content={title}
            position="BottomCenter"
            offsetY={0}
            showTipPointer={false} mouseTrail={true} 
        >
            <button
                type="button"
                onClick={() => customFunc()}
                style={{color}}
                className="relative text-2xl font-extrabold rounded-full p-3 hover:bg-light-gray"
            >
                <span 
                    style={{background: dotColor}}
                    className={`absolute inline-flex rounded-full h-3 w-3 right-3 top-3 ${backgroundColor ? [`bg-${backgroundColor}`] : "bg-inherit"}`}
                />
                {icon}
            </button>
        </TooltipComponent>
    )
}