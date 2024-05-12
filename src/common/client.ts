import axios from "axios";
import {API_URL} from "@/common/constant.ts";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {refreshAuth} from "@/common/refresh-auth.ts";

export const client = axios.create({
    baseURL: API_URL,
});

createAuthRefreshInterceptor(client, refreshAuth, {
    statusCodes: [401], // default: [ 401 ]
    pauseInstanceWhileRefreshing: true,
});