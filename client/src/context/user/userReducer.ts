import { IUserReducer } from "~/types/User";
import { userTypes } from "../types";
import { initialUserData } from "./UserContext";

const userReducer = (state: IUserReducer, action: any) => {
    const { type, payload } = action;

    switch(type) {
        case userTypes.authenticated:
            return {
                ...state,
                data: payload,
                status: 1
            }
        case userTypes.no_authenticated:
            return {
                ...state,
                status: 2
            }
        case userTypes.loggin:
            return {
                ...state,
                data: payload,
                status: 1
            }
        case userTypes.logout:
            return {
                ...state,
                data: initialUserData.data,
                status: 2
            }
        default:
            return state
    }
};

export default userReducer;