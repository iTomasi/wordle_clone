import { AxiosApi } from "../AxiosBase";
import { getCookie } from "~/helpers/handleCookies";
import { word_RegExp, trys_RegExp } from "~/helpers/customRegExp";

interface IAxiosCreateGame {
    word: string;
    trys: string;
    description?: string;
}

interface IAxiosVerifyWord {
    id: number;
    word: string;
}

export const AxiosGetGames = async () => {
    try {
        const { data } = await AxiosApi.get("/games");

        if (data.message !== "OK") throw data.message

        return data.data
    }

    catch(e: any) {
        console.log(e);
        console.log("AxiosGetGames() Error");

        if (e.toString().includes("Network Error")) throw new Error("can't connect with the api")

        throw new Error(e.toString())
    }
}

export const AxiosGetGameById = async (id: string, token: string) => {
    try {
        const { data } = await AxiosApi.get(`/game/${id}`, {
            headers: {
                "Authorization": token
            }
        })

        if (data.message !== "OK") return { error: data.message }

        return { data: data.data }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosGetGameById() Error");
        return { error: "Server Error Connection" }
    }
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

export const AxiosVerifyWord = async (payload: IAxiosVerifyWord) => {
    const userToken = getCookie("token");

    if (!userToken) return { error: "No logged" }

    const { word, id } = payload;

    if (!id) return { error: "Game id is missing" }
    else if (!word) return { error: "Word is missing" }

    try {
        const { data } = await AxiosApi.post(
            "/game/verify-word",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
            }
        );

        if (data.message !== "OK") return { error: data.message }

        return { data: data.data }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosVerifyWord() Error");
        return { error: "Server Internal Error" }
    }
}

export const AxiosGetLeaderboardById = async (id: string) => {
    const userToken = getCookie("token");

    if (!userToken) throw "No logged"

    try {
        const { data } = await AxiosApi.get("/game/leaderboard/" + id, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        });

        if (data.message !== "OK") throw data.message

        return data.data
    }

    catch(e: any) {
        console.log(e);
        console.log("AxiosGetLeaderboardById() Error");
        throw new Error(e.toString())
    }
}