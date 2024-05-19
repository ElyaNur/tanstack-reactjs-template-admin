import {ColumnSort, PaginationState, RowSelectionState, VisibilityState} from "@tanstack/react-table";
import {AxiosResponse} from "axios";
import React from "react";

export type UseMenuTableReturnType = {
    pagination: PaginationState,
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>,
    sorting: ColumnSort[],
    setSorting: React.Dispatch<React.SetStateAction<ColumnSort[]>>,
    globalFilter: string | undefined,
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>,
    rowSelection: RowSelectionState,
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>,
    columnVisibility: VisibilityState,
    setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>,
    data?: AxiosResponse
    isLoading: boolean,
    deleteBulk: (ids: number[]) => void,
    isPendingDeleteBulk: boolean,
}

export type Meta = {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

export type DataType = { [key: string]: string | number | null | object };
