import React from "react";
import { LinksFunction } from "remix";
import inputCss from "~/css/components/form/input.css";

interface IInputProps {
    className?: string;
    type?: "text" | "password";
    placeholder: string;
    labelTitle: string;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: inputCss }
    ]
}

const Input = ({ className = "", type = "text", placeholder, labelTitle }: IInputProps) => {
    return (
        <div className={`iw_input ${className}`}>
            <label className="text-base">{labelTitle}</label>

            <input className="iw_text-white text-base" type={type} placeholder={placeholder}/>
        </div>
    )
};

export default Input;