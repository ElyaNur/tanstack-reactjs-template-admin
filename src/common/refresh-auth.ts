import {client} from "./client";
import {useAuthStore} from "@/store/store.ts";

export const fetchNewToken = async () => {
    try {
        return await client
            .get("/auth/refresh", {
                headers: {
                    Authorization: `Bearer ${useAuthStore.getState().refreshToken}`
                }
            })
            .then(res => res.data);
    } catch (error) {
        return null;
    }
};

export const refreshAuth = async (failedRequest: {
    response: { config: { headers: { Authorization: string; }; }; };
}) => {
    const {access_token, refresh_token} = await fetchNewToken();

    if (access_token) {
        failedRequest.response.config.headers.Authorization = "Bearer " + access_token;

        const {setAccessToken, setRefreshToken} = useAuthStore.getState();
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        return Promise.resolve(access_token);
    } else {
        // you can redirect to login page here
        // router.push("/login");
        return Promise.reject();
    }
};