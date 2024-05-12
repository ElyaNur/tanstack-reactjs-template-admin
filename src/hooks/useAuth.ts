import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {API_URL} from "@/common/constant.ts";
import {Error, useAuthStore, useNavigationStore} from "@/store/store.ts";
import {useState} from "react";


export const useAuth = () => {
    const {
        isLogged,
        user,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        setIsLogged,
        setUser,
        accessToken,
    } = useAuthStore(state => ({
        isLogged: state.isLogged,
        user: state.user,
        refreshToken: state.refreshToken,
        setAccessToken: state.setAccessToken,
        setRefreshToken: state.setRefreshToken,
        setIsLogged: state.setIsLogged,
        setUser: state.setUser,
        accessToken: state.accessToken,
    }))

    const setIsLoading = useNavigationStore(state => state.setIsLoading)

    const [error, setError] = useState<Error | null>(null)

    const {mutate: login, isPending} = useMutation({
        mutationFn: (data: object) => axios.post(`${API_URL}/auth/login`, data),
        onSuccess: (data) => {
            const response = data.data;
            setAccessToken(response.access_token)
            setRefreshToken(response.refresh_token)
            setIsLogged(true)
            setIsLoading(true)
        },
        onError: (error: AxiosError) => {
            setError(error.response?.data as Error)
        }
    })

    const {mutate: logout} = useMutation({
        mutationFn: () => axios.get(`${API_URL}/auth/logout`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }),
        onSuccess: () => {
            setAccessToken('')
            setRefreshToken('')
            setIsLogged(false)
            setUser(null)
        },
    })


    return {
        error,
        user,
        isLogged,
        isPending,
        login,
        logout,
        refreshToken,
        accessToken,
    }
}

export type AuthState = {
    user: object | null
    isLogged: boolean
    error: Error | null
    login: (data: object) => void
    isPending: boolean
    logout: () => void
    refreshToken: string | null
    accessToken: string | null
}