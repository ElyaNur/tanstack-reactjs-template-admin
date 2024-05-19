import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {useDataTable} from "@/components/data-tables/hooks/use-data-table.ts";

export const useRoleTable = () => {
    const queryClient = useQueryClient()

    const {
        pagination,
        setPagination,
        sorting,
        setSorting,
        globalFilter,
        setGlobalFilter,
        rowSelection,
        setRowSelection,
        columnVisibility,
        setColumnVisibility,
    } = useDataTable()

    const {data, isLoading} = useQuery({
        queryKey: ['roles', pagination, sorting, globalFilter],
        queryFn: () => client.get('/roles', {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            },
            params: {
                ...pagination,
                pageIndex: pagination.pageIndex + 1,
                sort: sorting.map((sort) => `${sort.id}:${sort.desc ? 'desc' : 'asc'}`).join(','),
                filter: globalFilter,
            }
        }),
        placeholderData: keepPreviousData,
    })

    const {mutate: deleteBulk, isPending: isPendingDeleteBulk} = useMutation({
        mutationFn: (ids: number[]) => client.delete('/roles/bulk-delete', {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            },
            data: {
                ids
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['roles']})
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

    return {
        pagination,
        setPagination,
        sorting,
        setSorting,
        globalFilter,
        setGlobalFilter,
        rowSelection,
        setRowSelection,
        columnVisibility,
        setColumnVisibility,
        data,
        isLoading,
        deleteBulk,
        isPendingDeleteBulk,
    }
}