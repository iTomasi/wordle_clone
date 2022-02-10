import React, { useReducer, useEffect } from "react";
import { UserContext, initialState } from "./UserContext";
import userReducer from "./userReducer";
import { IUser } from "~/types/User";
import { userTypes } from "../types";

// Components
import LottieLoader from "~/components/LottieLoader";

// Requests
import { AxiosUserAuthenticated } from "~/requests/localApi/AxiosAuth";

interface IUserStateProps {
    children: React.ReactNode
}

const UserState = ({ children }: IUserStateProps) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    useEffect(() => {
        const effectFunc = async () => {
            const { error, data } = await AxiosUserAuthenticated();

            if (error) {
                dispatch({
                    type: userTypes.no_authenticated
                })
                return
            }

            dispatch({
                type: userTypes.authenticated,
                payload: data
            })
        }

        effectFunc();
    }, [])

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
            {
                state.status === 0 && <LottieLoader/>
            }
            {children}
        </UserContext.Provider>
    )
};

export default UserState;