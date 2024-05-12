import {createRouter, RouterProvider} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useAuth} from "@/hooks/useAuth.ts";
import {queryClient} from "@/main.tsx";
import {PulseLoader} from "react-spinners";
import {useNavigationStore} from "@/store/store.ts";

const router = createRouter({
    routeTree,
    context: {
        auth: undefined!,
        queryClient: undefined!,
    }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

function App() {
    const auth = useAuth();
    const isLoading = useNavigationStore((state) => state.isLoading);
    return <>
        {isLoading && (
            <div className="flex items-center justify-center w-full h-screen">
                <PulseLoader
                    color="#adadad"
                    loading={isLoading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )}
        <RouterProvider router={router} context={{auth, queryClient}}/>
        <ReactQueryDevtools initialIsOpen={false}/>
    </>
}

export default App;