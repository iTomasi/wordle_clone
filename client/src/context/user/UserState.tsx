import React, { useReducer } from "react";
import { UserContext, initialState } from "./UserContext";
import userReducer from "./userReducer";
import { IUser } from "~/types/User";
import { userTypes } from "../types";

// Components
import LottieLoader from "~/components/LottieLoader";

interface IUserStateProps {
    children: React.ReactNode
}

const UserState = ({ children }: IUserStateProps) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    const loggin = (payload: IUser, token: string) => {
        document.cookie = `token=${token}; path=/`;

        dispatch({
            type: userTypes.loggin,
            payload
        })
    }

    return (
        <UserContext.Provider value={{
            ...state,
            handlers: {
                loggin
            }
        }}>
            <LottieLoader/>
            {children}
        </UserContext.Provider>
    )
};

export default UserState;