import axios from "axios";
import {API_URL} from "@/common/constant.ts";

export const login = (data: object) => {
    return axios.post(`${API_URL}/login`, data)
}