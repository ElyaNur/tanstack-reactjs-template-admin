import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormSchema, optionSchema} from "@/components/page/menus/menu-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import FormMenu from "@/components/page/menus/form-menu.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {Link, useNavigate, useRouter} from "@tanstack/react-router";
import {Form} from "@/components/ui/form.tsx";
import {useEffect} from "react";
import {MenuData} from "@/components/page/menus/columns.tsx";
import {Button} from "@/components/ui/button.tsx";

const EditMenu = ({menuId}: { menuId: string }) => {
    const router = useRouter()

    const {data: menu} = useQuery({
        queryKey: ['menus', menuId],
        queryFn: () => client.get(`/menus/${menuId}`, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }).then((res) => res.data)
    })

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            icon: "",
            sort: 1,
            path: "",
            permission_ids: [],
        },
    })

    useEffect(() => {
        if (menu) {
            form.reset({
                name: menu.data.name || '',
                icon: menu.data.icon || '',
                sort: menu.data.sort || '',
                path: menu.data.path || '',
                parent_id: menu?.data.parent?.id.toString() || '',
                permission_ids: menu.data.permissions.map((permission: MenuData) => ({
                    label: permission.name,
                    value: permission.id.toString(),
                })) || []
            })
        }
    }, [menu]);

    const {mutate: updateMenu} = useMutation({
        mutationFn: (data: z.infer<typeof FormSchema>) => client.patch(`/menus/${menuId}`, data, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Data has been updated',
            })
            router.invalidate()
            queryClient.invalidateQueries({queryKey: ['menus', 'parent-menus', 'menu-tree']})
            navigate({to: '/menus'})
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to update data',
                variant: 'destructive'
            })
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const permissionIds = data.permission_ids?.map((permission: z.infer<typeof optionSchema>) => parseInt(permission.value))
        updateMenu({
            ...JSON.parse(JSON.stringify(data)),
            permission_ids: permissionIds
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormMenu form={form}/>
                <div className="flex gap-4 mt-4">
                    <Button type="submit">Simpan</Button>
                    <Button variant="outline" asChild>
                        <Link to="/menus">Batal</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EditMenu;