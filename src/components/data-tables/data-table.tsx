import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DataTablePagination} from "@/components/data-tables/data-table-pagination.tsx";
import DebounceInput from "@/components/ui/debounce-input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash2} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import DeleteButtonWithAlert from "@/components/delete-button-with-alert.tsx";
import {DataType, UseMenuTableReturnType} from "@/types/types.ts";

interface DataTableProps<TData extends DataType, TValue> {
    columns: ColumnDef<TData, TValue>[]
    hooks: UseMenuTableReturnType
}

export function DataTable<TData extends DataType, TValue>({columns, hooks}: DataTableProps<TData, TValue>) {
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
        data: query,
        isLoading,
        deleteBulk,
        isPendingDeleteBulk,
    } = hooks;

    const table = useReactTable({
        data: query?.data.data || [],
        columns,
        rowCount: query?.data.meta.totalItems || 0,
        getRowId: (row) => String(row.id),
        state: {
            pagination,
            sorting,
            globalFilter,
            rowSelection,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        enableGlobalFilter: true,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
    })

    const handleDeleteBulk = () => {
        const ids = Object.keys(rowSelection as Record<string, boolean>).map(Number)
        deleteBulk(ids)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <div>
                    {Object.keys(rowSelection).length > 0 && (
                        <DeleteButtonWithAlert isLoading={isPendingDeleteBulk} onClick={handleDeleteBulk}>
                            <Button
                                variant="link"
                                size="sm"
                                className="text-destructive-foreground hover:text-destructive flex gap-1"
                            >
                                <Trash2 className="w-4 h-4"/>
                                Hapus yang dipilih
                            </Button>
                        </DeleteButtonWithAlert>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Tampilan Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DebounceInput
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        placeholder="Search all columns..."
                        className="w-52"
                    />
                </div>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {query?.data && <DataTablePagination table={table} meta={query.data.meta}/>}
                </>
            )}
        </div>
    )
}