import React from "react";
import { LinksFunction, Link } from "remix";

// Css
import buttonCss from "~/css/components/button.css";

interface IButtonProps {
    className?: string;
    type?: "button" | "link";
    color: "primary" | "secundary"
    href?: string;
    children: React.ReactNode;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: buttonCss }
    ]
}

const Button = ({ className = "", type = "button", color, href = "#", children }: IButtonProps) => {
    if (type !== "link" && href !== "#") throw new Error(`<Button type="${type}"/> can't use href props, only for type "link"`)

    if (type === "link") {
        return (
            <Link to={href} className={`iw_button iw_text-white text-base iw_bg-${color} ${className}`}>
                {children}
            </Link>
        )
    }

    return (
        <button type={type} className={`iw_button iw_text-white text-base iw_bg-${color} ${className}`}>
            {children}
        </button>
    )
};

export default Button;