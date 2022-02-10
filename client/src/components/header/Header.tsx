import React from "react";

// Components
import Right from "./Right";

// Hooks
import {useUser} from "~/hooks/useUser";

const Header = () => {
    const { user } = useUser();

    console.log(user)

    return (
        <header className="iw_header">
            <div>
                Wordle Clone
            </div>

            <Right/>
        </header>
    )
};

export default Header;