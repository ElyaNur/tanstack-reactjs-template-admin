import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {lazy, Suspense} from "react";
import {AuthState} from "@/hooks/useAuth.ts";

interface RouterContext {
    // The ReturnType of your useAuth hook or the value of your AuthContext
    auth: AuthState
}

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : lazy(() =>
            // Lazy load in development
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
            })),
        )

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <>
            <Outlet/>
            <Suspense>
                <TanStackRouterDevtools/>
            </Suspense>
        </>
    ),
})
