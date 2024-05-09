import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useAuth} from "@/hooks/useAuth.ts";

const router = createRouter({
    routeTree,
    context: {auth: undefined!}
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function App() {
    const auth = useAuth();
    return <>
        <RouterProvider router={router} context={{auth}}/>
        <ReactQueryDevtools initialIsOpen={false}/>
    </>
}

export default App;