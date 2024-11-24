'use client'

import React, { useCallback, useState, useMemo } from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, 
  TooltipContent, 
  TooltipTrigger, 
  TooltipProvider, 
} from '@/components/ui/tooltip'

import TableTopbar from "./TableTopbar"
import { getColumns } from './jobsTableColumns'
import { ROOT_PATH } from "@/lib/utils" 

interface DeletedJobsTableProps {
  jobs: Job[];
  currentPath: string;
}

// Set given jobs as NOT deleted
export async function setAsNotDeleted(jobs: Job[]) {
  for (const element of jobs) {
    try {
      await fetch(`${ROOT_PATH}/api/jobs/deleted`, {
          method: 'PATCH',
          body: JSON.stringify({ id: element.id })
      })
    } catch (error) {
      console.log(`Error message: `, error);
    }
  }
}

const DeletedJobsTable = ({ jobs, currentPath }: DeletedJobsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: "submition_time", desc: true }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>({})

  const data = useMemo(() => Object.values(jobs), [jobs])
  const columns = useMemo(() => getColumns(currentPath), [currentPath])
  
  const handleRestoreRows = () => {
    const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);
    const selectedRowsData = selectedRowIds.map((id) => data[parseInt(id)]);
    
    setAsNotDeleted(selectedRowsData)
  }
  
  const PAGE_SIZE = 8
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    }
  })

  const handleNextPage = useCallback(() => table.nextPage(), [table])
  const handlePreviousPage = useCallback(() => table.previousPage(), [table])

  if (!data || !table) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="w-full">
      <TableTopbar table={table} rowSelection={rowSelection} data={data}/>
      <div className="flex flex-col ">
        <Card className="flex flex-col flex-1">
          <CardHeader>
            <CardTitle>Deleted Jobs</CardTitle> 
            <CardDescription>
              View jobs and manage your submitions.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-y-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="text-center">
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
                    className="text-center"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.column.id === "url" ? (
                            <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => window.open(row.getValue("url"), "_blank")} 
                                  className="btn btn-primary rounded-full">
                                  Apply
                                  <ExternalLink className="ml-2 h-4 w-4"/>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Apply for this job</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          ) : (flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                      >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
          <form className="flex items-center w-full justify-between">
            <div className="flex-1 text-xs text-muted-foreground">
              {table.getState().pagination.pageIndex} of{" "}
              {Math.ceil(data.length / PAGE_SIZE)} page(s)
            </div>
            <div className="flex">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousPage}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextPage}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
        </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default DeletedJobsTable
