import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface Error {
    message: string
    status: string
}

type AuthStore = {
    user: null | object
    isLogged: boolean
    error: Error | null
    accessToken: null | string
    refreshToken: null | string
    setError: (error: Error) => void
    setIsLogged: (isLogged: boolean) => void
    setUser: (user: object | null) => void
    setAccessToken: (accessToken: string) => void
    setRefreshToken: (refreshToken: string) => void
}

export const useAuthStore = create(persist<AuthStore>(
    (set) => ({
        user: null,
        isLogged: false,
        error: null,
        accessToken: '',
        refreshToken: '',
        setError: (error: Error) => set({error}),
        setIsLogged: (isLogged: boolean) => set({isLogged}),
        setUser: (user: object | null) => set({user}),
        setAccessToken: (accessToken: string) => set({accessToken}),
        setRefreshToken: (refreshToken: string) => set({refreshToken})
    }),
    {
        name: "auth",
    }
))

type NavigationStore = {
    isNotificationOpen: boolean
    isSideNavOpen: boolean
    setIsNotificationOpen: (isNotificationOpen: boolean) => void
    setIsSideNavOpen: (isSideNavOpen: boolean) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
    isNotificationOpen: false,
    isSideNavOpen: false,
    setIsNotificationOpen: (isNotificationOpen: boolean) => set({isNotificationOpen}),
    setIsSideNavOpen: (isSideNavOpen: boolean) => set({isSideNavOpen})
}))