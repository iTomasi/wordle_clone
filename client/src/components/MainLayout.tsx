import React, { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "remix";

// Hooks
import { useUser } from "~/hooks/useUser";

// Config
import routesCfg from "~/config/routes";

interface IMainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
    const { status } = useUser();
    const theLocation = useLocation();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (status === 0) return

        if (routesCfg.AUTH.includes(theLocation.pathname) && status === 1) {
            navigate("/");
            return
        }

    }, [theLocation, status])
    
    return (
        <>
        {children}
        </>
    )
};

export default MainLayout;