import { AxiosApi } from "../AxiosBase";

export const AxiosGetUser = async (username: string) => {
    try {
        const { data } = await AxiosApi.get(`/user/${username}`)

        if (data.message !== "OK") return { error: data.message }

        return {
            data: data.data
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosGetUser() Error");
        return { error: "Server Error Connection" }
    }
}