import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormSchema} from "@/components/page/roles/role-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Link, useNavigate} from "@tanstack/react-router";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {AxiosError} from "axios";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import FormPermission from "@/components/page/permissions/form-permission.tsx";

const TambahPermission = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate: createPermission} = useMutation({
        mutationFn: (data: z.infer<typeof FormSchema>) => client.post('/permissions', data, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['permissions']})
            toast({
                title: 'Success',
                description: 'Data has been saved',
            })
            navigate({to: '/permissions'})
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
        createPermission(data)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormPermission form={form}/>
                <div className="flex gap-4 mt-4">
                    <Button type="submit">Buat</Button>
                    <Button variant="outline" asChild>
                        <Link to="/permissions">Batal</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TambahPermission;