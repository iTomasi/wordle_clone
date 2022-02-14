import Axios from "axios";

export const AxiosApi = Axios.create({
    baseURL: "http://192.168.1.88:4000/api"
})