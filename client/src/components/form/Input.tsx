import React, { useState } from "react";
import { LinksFunction } from "remix";
import inputCss from "~/css/components/form/input.css";

// Components
import { HiEye, HiEyeOff } from "react-icons/hi";

interface IInputProps {
    className?: string;
    type?: "text" | "password" | "textarea";
    placeholder: string;
    labelTitle: string;
    name: string;
    isValid?: boolean;
    errorMessage?: string;
    value?: string;
    inputMode?: "text" | "numeric";
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: inputCss }
    ]
}

const Input = ({ className = "", type = "text", placeholder, labelTitle, name, isValid = true, errorMessage = "", value, inputMode = "text", onChange, onBlur }: IInputProps) => {
    if (inputMode !== "text" && type === "textarea") throw new Error(`<Input type="${type}"/> can't use inputMode props only available for input type="text" and type="password"`)

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className={`iw_input ${className}`}>
            <label className="text-base">{labelTitle}</label>

            {
                type === "password"
                ? (
                    <label className={`iw_theInputLabel ${!isValid ? "mb-2 iw_error" : ""}`}>
                        <input
                            className="iw_theInputPassword iw_text-white text-base"
                            type={showPassword ? "text" : "password"}
                            placeholder={placeholder}
                            name={name}
                            value={value}
                            inputMode={inputMode}
                            onChange={onChange}
                            onBlur={onBlur}
                        />

                        <div className="iw_inputIconContainer" onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword
                                    ? <HiEye className="iw_inputIcon"/>
                                    : <HiEyeOff className="iw_inputIcon"/>
                            }
                        </div>
                    </label>
                ) : type === "textarea" ? (
                    <textarea
                        className={`iw_theInput iw_theInputTextArea iw_text-white text-base ${!isValid ? "mb-2 iw_error" : ""}`}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    ></textarea>
                ) : (
                    <input
                        className={`iw_theInput iw_text-white text-base ${!isValid ? "mb-2 iw_error" : ""}`}
                        type={type}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        inputMode={inputMode}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )
            }

            {
                (!isValid && errorMessage) && (
                    <p className="text-base iw_text-error">{errorMessage}</p>
                )
            }
        </div>
    )
};

export default Input;