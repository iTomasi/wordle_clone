import React from "react";
import { LinksFunction, Link } from "remix";
import SpinnerLoader from "./SpinnerLoader";

// Css
import buttonCss from "~/css/components/button.css";

interface IButtonProps {
    className?: string;
    type?: "button" | "submit" | "link";
    color: "primary" | "secundary" | "error";
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
    loading?: boolean;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: buttonCss }
    ]
}

const Button = ({ className = "", type = "button", color, href = "#", onClick, children, loading = false }: IButtonProps) => {
    if (type !== "link" && href !== "#") throw new Error(`<Button type="${type}"/> can't use href props, only for type "link"`)
    else if (type !== "button" && onClick) throw new Error(`<Button type="${type}"/> can't use onClick props, only for type "button"`)

    if (type === "link") {
        return (
            <Link to={href} className={`iw_button iw_text-white text-base iw_bg-${color} ${className}`}>
                {children}
            </Link>
        )
    }

    return (
        <button type={type} className={`iw_button iw_text-white text-base iw_bg-${color} ${className}`} onClick={onClick} disabled={loading}>
            {
                loading
                    ? <SpinnerLoader/>
                    : children
            }
        </button>
    )
};

export default Button;