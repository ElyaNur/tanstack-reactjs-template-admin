import {useMutation, useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {API_URL} from "@/common/constant.ts";
import {Error, useAuthStore} from "@/store/store.ts";
import {useEffect, useState} from "react";
import {redirect} from "@tanstack/react-router";


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

    const [error, setError] = useState<Error | null>(null)

    const {mutate: login, isPending} = useMutation({
        mutationFn: (data: object) => axios.post(`${API_URL}/auth/login`, data),
        onSuccess: (data) => {
            const response = data.data;
            setAccessToken(response.access_token)
            setRefreshToken(response.refresh_token)
            setIsLogged(true)
        },
        onError: (error: AxiosError) => {
            setError(error.response?.data as Error)
        }
    })

    const {data, isLoading, error: userError} = useQuery({
        queryKey: ['user'],
        queryFn: () => axios.get(`${API_URL}/auth/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }),
    })

    const {mutate: getRefreshToken} = useMutation({
        mutationFn: () => axios.get(`${API_URL}/auth/refresh`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }),
        onSuccess: (data) => {
            const response = data.data;
            setAccessToken(response.access_token)
            setIsLogged(true)

            throw redirect({to: '/dashboard'})
        },
    })

    useEffect(() => {
        if (data) {
            setUser(data.data.data)
        }
    }, [data]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (userError?.response.status === 401) {
            setIsLogged(false)
            setAccessToken('')
            getRefreshToken()
            setUser(null)
        }
    }, [userError]);

    return {
        error,
        user,
        isLogged,
        isPending,
        login,
        isLoading,
    }
}

export type AuthState = {
    user: object | null
    isLogged: boolean
    error: Error | null
    login: (data: object) => void
    isPending: boolean
    isLoading: boolean
}