import React, { useReducer, useEffect } from "react";
import { useNavigate } from "remix";
import { toast } from "react-hot-toast";
import { UserContext, initialUserData } from "./UserContext";
import userReducer from "./userReducer";
import { IUser } from "~/types/User";
import { userTypes } from "../types";

// Components
import LottieLoader from "~/components/LottieLoader";

// Helpers
import { delCookie } from "~/helpers/handleCookies";

// Requests
import { AxiosUserAuthenticated } from "~/requests/localApi/AxiosAuth";

interface IUserStateProps {
    children: React.ReactNode
}

const UserState = ({ children }: IUserStateProps) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(userReducer, initialUserData);

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

    const logout = () => {
        dispatch({
            type: userTypes.logout
        });

        delCookie("token");
        toast.success("Logout successfully")
        navigate("/auth/sign-in")
    }
    
    return (
        <UserContext.Provider value={{
            ...state,
            handlers: {
                loggin,
                logout
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