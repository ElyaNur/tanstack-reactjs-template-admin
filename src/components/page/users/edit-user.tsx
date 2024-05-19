import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormSchema, optionSchema} from "@/components/page/users/user-form-schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import FormMenu from "@/components/page/users/form-user.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import {Form} from "@/components/ui/form.tsx";
import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import {RoleData} from "@/components/page/roles/columns.tsx";

const EditUser = ({userId}: { userId: string }) => {
    const {data: user} = useQuery({
        queryKey: ['users', userId],
        queryFn: () => client.get(`/users/${userId}`, {
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
            username: "",
            email: "",
            role_ids: [],
        },
    })

    useEffect(() => {
        if (user) {
            form.reset({
                username: user.data.username || '',
                email: user.data.email || '',
                role_ids: user.data.roles.map((role: RoleData) => ({
                    label: role.name,
                    value: role.id.toString(),
                })) || []
            })
        }
    }, [user]);

    const {mutate: updateMenu} = useMutation({
        mutationFn: (data: z.infer<typeof FormSchema>) => client.patch(`/users/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
            toast({
                title: 'Success',
                description: 'Data has been updated',
            })
            navigate({to: '/users'})
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
        const roleIds = data.role_ids?.map((role: z.infer<typeof optionSchema>) => parseInt(role.value))
        updateMenu({
            ...JSON.parse(JSON.stringify(data)),
            role_ids: roleIds
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormMenu form={form}/>
                <div className="flex gap-4 mt-4">
                    <Button type="submit">Simpan</Button>
                    <Button variant="outline" asChild>
                        <Link to="/users">Batal</Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EditUser;