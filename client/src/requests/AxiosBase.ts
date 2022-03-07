import Axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://192.168.1.88:4000"

export const AxiosApi = Axios.create({
    baseURL: `${API_URL}/api`
})