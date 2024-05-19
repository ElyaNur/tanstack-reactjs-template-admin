import {useState} from "react";
import {PaginationState, RowSelectionState, SortingState, VisibilityState} from "@tanstack/react-table";

export const useDataTable = (sortBy = 'name') => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([{
        id: sortBy,
        desc: false
    }])
    const [globalFilter, setGlobalFilter] = useState('')
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

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
    }
}