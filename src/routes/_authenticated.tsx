import {createFileRoute, Outlet, redirect} from '@tanstack/react-router'
import Navigation from "@/components/navigation/navigation.tsx";
import Drawer from "@/components/drawer/drawer.tsx";

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({context}) => {
        const {isLogged} = context.auth;
        if (!isLogged) {
            throw redirect({
                to: '/login',
            })
        }
    },

    component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
    return (
        <Navigation>
            <Drawer/>
            <Outlet/>
        </Navigation>
    )
}