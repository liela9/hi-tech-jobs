import { ChevronLeft, ChevronRight } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

interface TableBottombarProps {
    table: Table<Job>;
}

function TableBottombar({table}: TableBottombarProps) {
    return ( 
        <div className="flex items-center w-full justify-between">
            <div className="flex text-sm text-muted-foreground ml-3">
                {table.getPageCount() === 0 ? 0 : table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount().toLocaleString()} page(s)
            </div>
            <div className="flex text-xs text-muted-foreground items-center gap-1">
            Go to page:
                <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
                />
            </div>
            <div className="flex">
                <Button
                variant="ghost"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
                </Button>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default TableBottombar;