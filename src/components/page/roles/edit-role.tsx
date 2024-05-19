import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormSchema} from "@/components/page/roles/role-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import {Form} from "@/components/ui/form.tsx";
import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import FormRole from "@/components/page/roles/form-role.tsx";

const EditRole = ({roleId}: { roleId: string }) => {
    const {data: role} = useQuery({
        queryKey: ['role', roleId],
        queryFn: () => client.get(`/roles/${roleId}`, {
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
            permission_ids: [],
        },
    })

    useEffect(() => {
        if (role) {
            console.log(role.data.permissions?.map((permission: { id: number }) => permission.id))
            form.reset({
                name: role.data.name || '',
                permission_ids: role.data.permissions?.map((permission: { id: number }) => permission.id)
            })
        }
    }, [role]);

    const {mutate: updateRole} = useMutation({
        mutationFn: (data: z.infer<typeof FormSchema>) => client.patch(`/roles/${roleId}`, data, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['roles']})
            toast({
                title: 'Success',
                description: 'Data has been updated',
            })
            navigate({to: '/roles'})
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
        updateRole({...data, permission_ids: data.permission_ids?.filter(permission => permission)})
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormRole form={form}/>
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

export default EditRole;