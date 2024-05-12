import {create} from "zustand";
import {persist} from "zustand/middleware";
import {LucideIcon} from "lucide-react";

export interface Error {
    message: string
    status: string
}

interface user {
    id: number
    username: string
    email: string
    password: string
    refreshToken: string
    roles: string[]
}

export type AuthStore = {
    user: null | user
    isLogged: boolean
    error: Error | null
    accessToken: null | string
    refreshToken: null | string
    setError: (error: Error) => void
    setIsLogged: (isLogged: boolean) => void
    setUser: (user: user | null) => void
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
        setUser: (user: user | null) => set({user}),
        setAccessToken: (accessToken: string) => set({accessToken}),
        setRefreshToken: (refreshToken: string) => set({refreshToken})
    }),
    {
        name: "auth",
    }
))

type GroupItem = {
    group: GroupItem[]
    id: number;
    title: string;
    icon: LucideIcon;
    path?: string;
    label?: string;
    variant: "default" | "ghost";
}

export type MenuItem = {
    id: number;
    title?: string;
    icon?: LucideIcon;
    group: GroupItem[];
}

type NavigationStore = {
    menus: MenuItem[]
    isLoading: boolean
    isNotificationOpen: boolean
    isSideNavOpen: boolean
    setMenus: (menus: never[]) => void
    setIsNotificationOpen: (isNotificationOpen: boolean) => void
    setIsSideNavOpen: (isSideNavOpen: boolean) => void
    setIsLoading: (isLoading: boolean) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
    menus: [],
    isLoading: true,
    isNotificationOpen: false,
    isSideNavOpen: false,
    setMenus: (menus) => set({menus}),
    setIsNotificationOpen: (isNotificationOpen: boolean) => set({isNotificationOpen}),
    setIsSideNavOpen: (isSideNavOpen: boolean) => set({isSideNavOpen}),
    setIsLoading: (isLoading: boolean) => set({isLoading})
}))
