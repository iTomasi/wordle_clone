import React from "react";

// Components
import Right from "./right/Right";

const Header = () => {
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