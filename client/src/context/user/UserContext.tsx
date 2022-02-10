import { createContext } from "react";
import { IUserHandlers, IUserContext, IUserReducer } from "~/types/User";

export const initialUserData: IUserReducer = {
    data: {
        id: 0,
        username: "",
        email: "",
        name: "",
        profile_picture: ""
    },
    status: 0
}

const initialHandlers: IUserHandlers = {
    loggin: () => {}
}

export const initialState: IUserContext = {
    ...initialUserData,
    handlers: initialHandlers
}

export const UserContext = createContext<IUserContext>(initialState)