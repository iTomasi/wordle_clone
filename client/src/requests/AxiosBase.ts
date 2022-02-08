import Axios from "axios";

export const AxiosApi = Axios.create({
    baseURL: "http://localhost:4000/api"
})