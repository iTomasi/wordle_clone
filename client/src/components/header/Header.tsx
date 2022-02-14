import React from "react";

// Components
import Left from "./left/Left";
import Right from "./right/Right";

const Header = () => {
    return (
        <header className="iw_header">
            <Left/>

            <Right/>
        </header>
    )
};

export default Header;