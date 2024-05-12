import {createFileRoute} from '@tanstack/react-router'
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Terminal} from "lucide-react";
import {useAuthStore} from "@/store/store.ts";

export const Route = createFileRoute('/_authenticated/dashboard')({
    component: Dashboard
})

function Dashboard() {
    const user = useAuthStore(state => state.user)

    return (
        <>
            <header>
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">Dashboard</h1>
                </div>
            </header>
            <div className="grid auto-cols-fr gap-y-8">
                <Alert className="bg-primary-foreground">
                    <Terminal className="h-4 w-4"/>
                    <AlertTitle>Welcome !</AlertTitle>
                    <AlertDescription>
                        {user && user.username}
                    </AlertDescription>
                </Alert>
            </div>
        </>
    )
}