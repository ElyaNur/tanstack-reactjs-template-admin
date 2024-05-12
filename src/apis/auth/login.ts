import {QueryClient, queryOptions} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";

export const fetchUserData = (queryClient: QueryClient) => queryClient?.ensureQueryData(queryOptions({
    queryKey: ['user'],
    queryFn: () => client.get(`/auth/user`, {
        headers: {
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`
        }
    }).then(res => res.data),
}))

export const fetchMenuTree = (queryClient: QueryClient) => queryClient?.ensureQueryData(queryOptions({
    queryKey: ['menus-tree'],
    queryFn: () => client.get(`/menus/tree`, {
        headers: {
            Authorization: `Bearer ${useAuthStore.getState().accessToken}`
        }
    }).then(res => res.data),
}))
