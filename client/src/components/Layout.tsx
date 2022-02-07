import React from "react";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
    return (
        <main className="iw_layout">
            {children}
        </main>
    )
};

export default Layout;