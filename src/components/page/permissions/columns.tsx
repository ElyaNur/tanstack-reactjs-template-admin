import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DataTableColumnHeader} from "@/components/data-tables/data-table-column-headet.tsx";
import ActionColumn from "@/components/data-tables/action-column.tsx";

export type PermissionData = {
    id: number
    name: string
    created_at: string
    updated_at: string
}

export const columns: ColumnDef<PermissionData>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({column}) => (<DataTableColumnHeader column={column} title="NAME"/>),
    },
    {
        id: "actions",
        header: "ACTIONS",
        cell: ({row}) => (
            <ActionColumn url={`/permissions/${row.original.id}`} queryKey={['permissions']}/>
        ),
        enableSorting: false,
        enableHiding: false,
    }
]