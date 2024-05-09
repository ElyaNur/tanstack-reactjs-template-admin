import {createLazyFileRoute, useNavigate} from '@tanstack/react-router'
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {Loader2} from "lucide-react";
import {useEffect} from "react";


export const Route = createLazyFileRoute('/login')({
    component: Login
})


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username minimal 2 karakter",
    }).max(50, {message: "Username maksimal 50 karakter"}),
    password: z.string().min(8, {
        message: "Password minimal 8 karakter",
    })
})


function Login() {
    const navigate = useNavigate()

    const {login, isPending, error, isLogged} = useAuth()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    useEffect(() => {
        if (isLogged) {
            navigate({to: '/dashboard'})
        }
    }, [isLogged]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        login(values)
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-3 xl:min-h-[800px] max-h-svh">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Lgoin menggunakan kredensial yang benar
                        </p>
                        {error && (
                            <p className="text-red-500">{error.message}</p>
                        )}
                    </div>
                    <Form {...form}>
                        <form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="username">Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ekagustiwana"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                {isPending ? 'Memproses...' : 'Login'}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block col-span-2 w-full h-full">
                <img src="/placeholder.jpg" alt="placeholder" className="h-svh object-cover"/>
            </div>
        </div>
    )
}