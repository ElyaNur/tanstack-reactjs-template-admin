import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import DeleteButtonWithAlert from "@/components/delete-button-with-alert.tsx";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

type DeleteButtonProps = {
    url: string
    queryKey?: string[]
}

export default function DeleteButton({url, queryKey}: DeleteButtonProps) {
    const queryClient = useQueryClient()
    const {toast} = useToast()

    const {mutate, isPending} = useMutation({
        mutationFn: () => client.delete(url, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey})
            toast({
                title: 'Success',
                description: 'Data has been deleted',
            })
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to delete data',
                variant: 'destructive'
            })
        }
    })

    return (
        <DeleteButtonWithAlert isLoading={isPending} onClick={() => mutate()}>
            <Button variant="destructive" size="icon">
                <Trash className="w-4 h-4"/>
            </Button>
        </DeleteButtonWithAlert>
    )
}