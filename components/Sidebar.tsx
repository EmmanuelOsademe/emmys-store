"use client";

import { useStateContext } from "@/contexts/ContextProvider";
import {SiShopware} from "react-icons/si";
import Link from "next/link";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";
import Rating from "./Rating";

const Sidebar: React.FC = () => {
    const {activeMenu, setActiveMenu, currentColor} = useStateContext();

    return (
        <div className="h-screen dark:bg-secondary-dark-bg bg-slate-100 border-solid border-x-2 border-gray-400 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center border-solid border-y-2 border-gray-400">
                        <Link 
                            href="/"
                            className="flex items-center gap-4 px-4 h-16 text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                        >
                            <SiShopware />
                            <span>Emmys Store</span>
                        </Link>
                        <TooltipComponent content="Close" position="BottomCenter">
                            <button
                                type="button"
                                style={{color: 'rgb(153, 171, 180)', borderRadius:"50%"}}
                                onClick={() => setActiveMenu((prev) => !prev)}
                                className="text-xl rounded-full p-3 hover:bg-light-gray mt4 block md:hidden"
                            >
                                <MdOutlineCancel />
                            </button>
                        </TooltipComponent>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 ml-4">
                        <span className="font-bold text-xl">Sort/Filter Products</span>
                        <div className="flex align-middle gap-3 text-xl ml-2">
                            <input 
                                type="radio"
                                name="radio"
                                className="hover:cursor-pointer"
                            />
                            <span>Ascending Price</span>
                        </div>
                        <div className="flex align-middle gap-3 text-xl ml-2">
                            <input 
                                type="radio"
                                name="radio"
                                className="hover:cursor-pointer"
                            />
                            <span>Descending Price</span>
                        </div>
                        <div className="flex align-middle gap-3 text-xl ml-2">
                            <input 
                                type="checkbox"
                                name="radio"
                                className="hover:cursor-pointer"
                            />
                            <span>Include Out of Stock</span>
                        </div>
                        <div className="flex align-middle gap-3 text-xl ml-2">
                            <input 
                                type="checkbox"
                                name="radio"
                                className="hover:cursor-pointer"
                            />
                            <span>Free Shipping Only</span>
                        </div>

                        <Rating 
                            rating={1}
                            onClick={() => {}}
                        />

                        <button
                            type="button"
                            onClick={() => {}}
                            style={{backgroundColor: currentColor}}
                            className="font-bold rounded-full text-white h-10 w-2/3 hover:cursor-pointer"
                        >
                            Clear All
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Sidebar;