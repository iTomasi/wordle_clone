import React, { useEffect } from "react";
import { LinksFunction, Link } from "remix";

// Hooks
import { useUser } from "~/hooks/useUser";

// Css
import userNavBarCss from "~/css/components/header/userNavBar.css";

interface IUserNavProps {
    show: boolean;
    setShow: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: userNavBarCss }
    ]
}

export const UserNavBar = ({ show, setShow }: IUserNavProps) => {
    const { user, handlers: { logout } } = useUser();

    useEffect(() => {
        const handleOnClick = (e: any) => {
            if (!show) return

            let theTarget = e.target;
            let targetedElement: boolean = false;

            while(true) {
                if (!theTarget) break

                try {
                    if (theTarget.classList.contains("iw_userNavBar") || theTarget.classList.contains("iw_userPictureContainer")) {
                        targetedElement = true;
                        break
                    }

                    theTarget = theTarget.parentElement
                    continue
                }

                catch(e) {
                    console.log(e);
                    console.log("UserNavBar.tsx handleOnClick() error")
                    break
                }
            }

            if (!targetedElement) {
                setShow(false)
            }
        }

        window.addEventListener("click", handleOnClick);

        return () => window.removeEventListener("click", handleOnClick)
    }, [show])

    const navigation = [
        { title: "Profile", type: "link", href: `/user/${user.username.toLowerCase()}` },
        { title: "Create Game", type: "link", href: "/create/game" },
        { title: "Logout", type: "button", onClick: logout }
    ];

    return (
        <div className={`iw_userNavBar ${show ? "active" : "noactive"}`}>
            {
                navigation.map((value, index) => {
                    if (value.type === "link") {
                        return (
                            <Link key={index} className="iw_nav" to={value.href || "#"}>
                                {value.title}
                            </Link>
                        )
                    }

                    else if (value.type === "button") {
                        return (
                            <button key={index} type="button" className="iw_nav" onClick={value.onClick}>
                                {value.title}
                            </button>
                        )
                    }

                    return null
                })
            }
        </div>
    )
};