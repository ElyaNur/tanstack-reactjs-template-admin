import {createLazyFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {AxiosError} from "axios";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import DeleteButtonWithAlert from "@/components/delete-button-with-alert.tsx";
import {Button} from "@/components/ui/button.tsx";
import EditRole from "@/components/page/roles/edit-role.tsx";

export const Route = createLazyFileRoute('/_authenticated/roles/$roleId/edit')({
    component: Edit
})

function Edit() {
    const {roleId} = Route.useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate: deleteRole, isPending} = useMutation({
        mutationFn: () => client.delete(`/roles/${roleId}`, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['roles']})
            toast({
                title: 'Success',
                description: 'Successfully edit data',
            })
            navigate({to: '/roles'})
        },
        onError: (error: AxiosError) => {
            toast({
                title: 'Failed to edit data',
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                      <code className="text-white">{JSON.stringify(error.response?.data, null, 2)}</code>
                    </pre>
                ),
                variant: 'destructive'
            })
        }
    })

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/roles">Role</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit Role</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">
                        Edit Role
                    </h1>
                </div>
                <DeleteButtonWithAlert isLoading={isPending} onClick={() => deleteRole()}>
                    <Button variant="destructive">Hapus</Button>
                </DeleteButtonWithAlert>
            </header>
            <EditRole roleId={roleId}/>
        </>
    )
}