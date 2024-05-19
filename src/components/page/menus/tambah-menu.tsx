import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {Link, useNavigate, useRouter} from "@tanstack/react-router";
import {FormSchema, optionSchema} from "@/components/page/menus/menu-form-schema.ts";
import FormMenu from "@/components/page/menus/form-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {AxiosError} from "axios";

const TambahMenu = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            icon: "",
            sort: 1,
            permission_ids: [],
        },
    })

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate: createMenu} = useMutation({
        mutationFn: (data: z.infer<typeof FormSchema>) => client.post('/menus', data, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Data has been saved',
            })
            router.invalidate()
            queryClient.invalidateQueries({queryKey: ['menus', 'parent-menus', 'menu-trees']})
            navigate({to: '/menus'})
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
        const permissionIds = data.permission_ids?.map((permission: z.infer<typeof optionSchema>) => parseInt(permission.value))

        createMenu({
            ...JSON.parse(JSON.stringify(data)),
            permission_ids: permissionIds,
        })

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormMenu form={form}/>
                <div className="flex gap-4 mt-4">
                    <Button type="submit">Buat</Button>
                    <Button variant="outline" asChild>
                        <Link to="/menus">Batal</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TambahMenu;