import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import Navigation from "@/components/navigation/navigation.tsx";
import Drawer from "@/components/drawer/drawer.tsx";
import {useAuthStore, useNavigationStore} from "@/store/store.ts";
import {fetchMenuTree, fetchUserData} from "@/apis/auth/login.ts";

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({context}) => {
        const {isLogged} = context.auth;
        if (!isLogged) {
            throw redirect({
                to: '/login',
            })
        }
    },

    loader: async ({context}) => ({
        user: await fetchUserData(context?.queryClient),
        menu: await fetchMenuTree(context?.queryClient)
    }),

    component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
    const setIsLoading = useNavigationStore(state => state.setIsLoading);
    const setMenus = useNavigationStore(state => state.setMenus);
    const setUser = useAuthStore(state => state.setUser);
    const data = Route.useLoaderData();

    setMenus(data.menu.data);
    setUser(data.user.data);
    setIsLoading(false);

    return <Navigation>
        <Drawer/>
        <Outlet/>
    </Navigation>
}