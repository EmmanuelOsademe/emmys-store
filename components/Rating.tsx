"use client"

import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {CSSProperties} from "react";

interface Props {
    rating: number;
    onClick: (index: number) => void;
    style?: CSSProperties;
}

export const Rating: React.FC<Props> = ({rating, onClick, style}) => {

    return (
        <div className="flex align-middle gap-2 w-2/3 justify-center text-2xl">
            {
                [...Array(5)].map((_, index) => {
                    return (
                        <span
                            key={index}
                            onClick={() => (index)}
                            style={style}
                        >
                            {rating > index 
                                ? <AiFillStar  className="text-2xl hover:cursor-pointer"/> 
                                : <AiOutlineStar />
                            }
                        </span>
                    )
                })
            }
        </div>
    )
}

export default Rating;