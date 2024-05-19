import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormSchema} from "@/components/page/users/user-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Link, useNavigate} from "@tanstack/react-router";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {AxiosError} from "axios";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import FormUser from "@/components/page/users/form-user.tsx";

const TambahUser = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            role_ids: [],
        },
    })

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate: createUser} = useMutation({
        mutationFn: (data: z.infer<typeof FormSchema>) => client.post('/users', data, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
            toast({
                title: 'Success',
                description: 'Data has been saved',
            })
            navigate({to: '/users'})
        },
        onError: (data: AxiosError) => {
            toast({
                title: 'Failed to save data',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                      <code className="text-white">{JSON.stringify(data.response?.data, null, 2)}</code>
                    </pre>
                ),
                variant: 'destructive'
            })
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        createUser({
            ...JSON.parse(JSON.stringify(data)),
            role_ids: data.role_ids.map(role => parseInt(role.value))
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormUser form={form}/>
                <div className="flex gap-4 mt-4">
                    <Button type="submit">Buat</Button>
                    <Button variant="outline" asChild>
                        <Link to="/roles">Batal</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TambahUser;