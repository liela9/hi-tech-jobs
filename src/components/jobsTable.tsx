'use client'

import React, { useState, useMemo } from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
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
import TableBottombar from "./TableBottombar"

interface JobsTableProps {
  jobs: Job[];
  currentPath: string;
  categories: string[];
}

const JobsTable = ({ jobs, currentPath, categories }: JobsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: "submition_time", desc: true }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>({})
  const categoryPrefrences = ['all departments'].concat(categories)

  const data = useMemo(() => Object.values(jobs), [jobs])
  const columns = useMemo(() => getColumns(currentPath, categoryPrefrences), [currentPath, categoryPrefrences])
  
  const PAGE_SIZE = 6
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  })

  const table = useReactTable({
    // debugTable: true, 
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })  
    
  if (!data || !table) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="w-full">
      <TableTopbar table={table} rowSelection={rowSelection} data={data} currentPath={currentPath}/>
      <div className="flex flex-col ">
        <Card className="flex flex-col flex-1">
          <CardHeader>
            {currentPath === '/jobs' ? <CardTitle>Jobs</CardTitle> 
            : <CardTitle>Submitted Jobs</CardTitle>
            }
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
            <TableBottombar table={table}/>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default JobsTable
