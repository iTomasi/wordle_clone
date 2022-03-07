import Axios from "axios";

//const API_URL = "http://192.168.1.88:4000"
const API_URL = "https://wordle-backend-livid.vercel.app"

export const AxiosApi = Axios.create({
    baseURL: `${API_URL}/api`
})