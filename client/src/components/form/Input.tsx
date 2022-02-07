import React from "react";
import { LinksFunction } from "remix";
import inputCss from "~/css/components/form/input.css";

interface IInputProps {
    className?: string;
    type?: "text" | "password";
    placeholder: string;
    labelTitle: string;
    name: string;
    isValid?: boolean;
    errorMessage?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: inputCss }
    ]
}

const Input = ({ className = "", type = "text", placeholder, labelTitle, name, isValid = true, errorMessage = "", onChange, onBlur }: IInputProps) => {
    return (
        <div className={`iw_input ${className}`}>
            <label className="text-base">{labelTitle}</label>

            <input
                className={`iw_text-white text-base ${!isValid ? "mb-2 iw_error" : ""}`}
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
            />

            {
                (!isValid && errorMessage) && (
                    <p className="text-base iw_text-error">{errorMessage}</p>
                )
            }
        </div>
    )
};

export default Input;