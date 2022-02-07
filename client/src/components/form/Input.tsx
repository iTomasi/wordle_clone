import React from "react";
import { LinksFunction } from "remix";
import inputCss from "~/css/components/form/input.css";

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: inputCss }
    ]
}

const Input = () => {
    return (
        <div>
            <label>Label</label>

            <input type="text" placeholder="asdasdasd"/>
        </div>
    )
};

export default Input;