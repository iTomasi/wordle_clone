import React from "react";
import { LinksFunction } from "remix";
import Button from "../Button";

// Css
import navBarCss from "~/css/components/game/navBar.css";

interface INavBarProps {
    className?: string;
    nav: string;
    setNav: (value: string | ((prev: string) => string)) => void;
}

const navigation = [
    { name: "Play", value: "play" },
    { name: "Leaderboard", value: "leaderboard" }
]

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: navBarCss }
    ]
}

export const NavBar = ({ className = "", nav, setNav }: INavBarProps) => {
    return (
        <nav className={`iw_navBar ${className}`}>
            <ul>
                {
                    navigation.map((value, index) => (
                        <li key={index}>
                            <Button
                                color="primary"
                                onClick={() => {
                                    if (nav === value.value) return
                                    setNav(value.value)
                                }}
                            >
                                {value.name}
                            </Button>
                        </li>
                    ))
                }   
            </ul>
        </nav>
    )
};