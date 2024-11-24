import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Trash2 } from "lucide-react"
import { Table } from "@tanstack/react-table"

import { ROOT_PATH } from "@/lib/utils" 


interface TableTopbarProps {
    table: Table<Job>;
    rowSelection: {[key: string]: boolean};
    data: Job[];
}

// Set given jobs as deleted
export async function setAsDeleted(jobs: Job[]) {
    for (const element of jobs) {
      try {
        await fetch(`${ROOT_PATH}/api/jobs/deleted`, {
            method: 'DELETE',
            body: JSON.stringify({ id: element.id })
        })
      } catch (error) {
        console.log(`Error message: `, error);
      }
    }
}

const handleDeleteRows = (rowSelection: {[key: string]: boolean}, data: Job[]) => {
    const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);
    const selectedRowsData = selectedRowIds.map((id) => data[parseInt(id)]);
    
    setAsDeleted(selectedRowsData)
}

function TableTopbar({table, rowSelection, data}: TableTopbarProps) {
    return (
        <div className="flex py-4">
            <Input
            placeholder="Filter..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) =>
                table.setGlobalFilter(event.target.value)
            }
            className="max-w-sm"
            />
            {Object.keys(rowSelection).length > 0 && (
                <Button
                variant="destructive"
                className="ml-4"
                onClick={() => handleDeleteRows(rowSelection, data)}
                >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
                </Button>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                        return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                            }
                        >
                            {column.id}
                        </DropdownMenuCheckboxItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TableTopbar;