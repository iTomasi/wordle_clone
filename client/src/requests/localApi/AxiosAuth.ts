import { AxiosApi } from "../AxiosBase";

// Helpers
import { name_RegExp, username_RegExp, email_RegExp, password_RegExp } from "~/helpers/customRegExp";
import { getCookie } from "~/helpers/handleCookies";

interface IAxiosSignUpEmail {
    name: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

export const AxiosUserAuthenticated = async () => {
    const userToken = getCookie("token");

    if (!userToken) return { error: "No logged" }

    try {
        const { data } = await AxiosApi.get("/auth", {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        })

        if (data.message !== "OK") return { error: data.message }

        return {
            data: data.data
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosUserAuthenticated() Error");
        return { error: "Server Error Connection" }
    }
}

export const AxiosSignUpEmail = async (payload: IAxiosSignUpEmail) => {
    const { name, username, email, password, confirm_password } = payload;

    if (!name_RegExp.test(name)) return { error: { inputName: "name", message: "Invalid name" } }
    else if (!username_RegExp.test(username)) return { error: { inputName: "username", message: "Invalid username" } }
    else if (!email_RegExp.test(email)) return { error: { inputName: "email", message: "Wrong email, example: wordle@app.com" } }
    else if (!password_RegExp.test(password)) return { error: { inputName: "password", message: "Your password should contains at least 5 characters" } }
    else if (password !== confirm_password) return { error: { inputName: "confirm_password", message: "Your passwords not match!" } }

    try {
        const { data } = await AxiosApi.post(
            "/auth/sign-up/email",
            payload,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (data.message !== "OK") return { error: data }

        return {
            data: data.data
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosSignUpEmail() Error");
        return { error: "Server Error Connection" }
    }
}