import {ColumnDef} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {DataTableColumnHeader} from "@/components/data-tables/data-table-column-headet.tsx";
import Icon from "@/components/icon.tsx";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import {Meta} from "@/types/types.ts";
import ActionColumn from "@/components/data-tables/action-column.tsx";
import BadgePermissions from "@/components/page/menus/badge-permissions.tsx";

export type MenuData = {
    id: number
    name: string
    icon: keyof typeof dynamicIconImports
    path: number | null
    sort: string
    created_at: string
    updated_at: string
    parent: Menu["data"]
    permissions: {
        id: number
        name: string
        created_at: string
        updated_at: string
    }[]
}

export type Menu = {
    success: boolean
    data: MenuData
    meta: Meta
}

export const columns: ColumnDef<MenuData>[] = [
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
        accessorKey: "icon",
        header: ({column}) => (<DataTableColumnHeader column={column} title="ICON"/>),
        cell: ({row}) => {
            const menu = row.original;

            return (
                <div className="flex items-center gap-3">
                    <Icon name={menu.icon} className="w-6 h-6"/>
                </div>
            )
        }
    },
    {
        accessorKey: "path",
        header: "PATH",
        cell: ({row}) => {
            const menu = row.original;

            return (
                <div>{menu.path ? menu.path : "-"}</div>
            )
        }
    },
    {
        accessorKey: "permissions",
        header: "PERMISSIONS",
        cell: ({row}) => (<BadgePermissions menu={row.original}/>),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "actions",
        header: "ACTIONS",
        cell: ({row}) => (
            <ActionColumn url={`/menus/${row.original.id}`} queryKey={['menus']}/>
        ),
        enableSorting: false,
        enableHiding: false,
    }
]