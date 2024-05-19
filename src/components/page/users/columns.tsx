import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DataTableColumnHeader} from "@/components/data-tables/data-table-column-headet.tsx";
import ActionColumn from "@/components/data-tables/action-column.tsx";
import {RoleData} from "@/components/page/roles/columns.tsx";
import BadgeRoles from "@/components/page/users/badge-roles.tsx";

export type UserData = {
    id: number
    username: string
    email: string
    created_at: string
    updated_at: string
    roles: RoleData[]
}

export const columns: ColumnDef<UserData>[] = [
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
        accessorKey: "username",
        header: ({column}) => (<DataTableColumnHeader column={column} title="USERNAME"/>),
    },
    {
        accessorKey: "email",
        header: ({column}) => (<DataTableColumnHeader column={column} title="EMAIL"/>),
    },
    {
        accessorKey: "roles",
        header: "ROLES",
        cell: ({row}) => (<BadgeRoles user={row.original}/>),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "actions",
        header: "ACTIONS",
        cell: ({row}) => (
            <ActionColumn url={`/users/${row.original.id}`} queryKey={['users']}/>
        ),
        enableSorting: false,
        enableHiding: false,
    }
]