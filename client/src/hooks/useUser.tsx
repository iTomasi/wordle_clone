import React, { useContext } from "react";
import { UserContext } from "~/context/user/UserContext";

export const useUser = () => {
    const { data, status, handlers } = useContext(UserContext);

    return {
        user: data,
        status,
        handlers
    }
}