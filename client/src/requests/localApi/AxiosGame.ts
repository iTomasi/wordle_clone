import { AxiosApi } from "../AxiosBase";
import { getCookie } from "~/helpers/handleCookies";
import { word_RegExp, trys_RegExp } from "~/helpers/customRegExp";

interface IAxiosCreateGame {
    word: string;
    trys: string;
    description?: string;
}

export const AxiosCreateGame = async (payload: IAxiosCreateGame) => {
    const userToken = getCookie("token");

    if (!userToken) return { error: { type: "toast", message: "No logged" } }

    const { word, trys } = payload;

    const parseTrys = parseInt(trys);

    if (!word || !word_RegExp.test(word) || word.length < 3 || word.length > 45) return { error: { type: "input", inputName: "word" } }
    else if (!trys || !trys_RegExp.test(trys) || isNaN(parseTrys) || parseTrys < 1 || parseTrys > 20) return { error: { type: "input", inputName: "trys" } }

    try {
        const { data } = await AxiosApi.post(
            "/game/create",
            { ...payload, trys: parseTrys },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
            }
        );

        if (data.message !== "OK") return { error: { type: "toast", message: data.message } }

        return { success: "PRO" }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosCreateGame() Error");
        return { error: { type: "toast", message: "Server Error Connection" } }
    }
}