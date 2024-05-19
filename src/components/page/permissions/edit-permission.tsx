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

const EditPermission = ({permissionId}: { permissionId: string }) => {
    const {data: permission} = useQuery({
        queryKey: ['permission', permissionId],
        queryFn: () => client.get(`/permissions/${permissionId}`, {
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
        },
    })

    useEffect(() => {
        if (permission) {
            form.reset({
                name: permission.data.name || '',
            })
        }
    }, [permission]);

    const {mutate: updatePermission} = useMutation({
        mutationFn: (data: z.infer<typeof FormSchema>) => client.patch(`/permissions/${permissionId}`, data, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['permissions']})
            toast({
                title: 'Success',
                description: 'Data has been updated',
            })
            navigate({to: '/permissions'})
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
        updatePermission(data)
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

export default EditPermission;