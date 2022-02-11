export interface IUser {
    id: number;
    name: string;
    email: string;
    username: string;
    profile_picture: string;
}

export interface IUserHandlers {
    loggin: (payload: IUser, token: string) => void
    logout: () => void
}

export interface IUserContext {
    data: IUser;
    status: number;
    handlers: IUserHandlers
}

export interface IUserReducer {
    data: IUser;
    status: number;
}

