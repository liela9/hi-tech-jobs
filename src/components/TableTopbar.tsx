import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, 
    TooltipContent, 
    TooltipTrigger, 
    TooltipProvider, 
} from '@/components/ui/tooltip'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, FolderOutput } from "lucide-react"
import { Table } from "@tanstack/react-table"

import DeleteButton from "./DeleteButton"
import { changeIsDeleted } from "@/lib/utils"
import { ROOT_PATH } from "@/lib/utils"

interface TableTopbarProps {
    table: Table<Job>;
    rowSelection: {[key: string]: boolean};
    data: Job[];
    currentPath: string;
}

async function handleRefreshData() {
    try {
        await fetch(`${ROOT_PATH}/api/jobs`, {
            method: 'POST',
        })
    } catch (error) {
        console.log(`Error message: `, error);
    }
}

function TableTopbar({table, rowSelection, data, currentPath}: TableTopbarProps) {
    return (
        <div className="flex py-4 justify-between">
            <div className="flex flex-initial w-full">
                <Input
                placeholder="Filter..."
                value={(table.getState().globalFilter as string) ?? ""}
                onChange={(event) =>
                    table.setGlobalFilter(event.target.value)
                }
                className="max-w-sm"
                />
                <form>
                    {Object.keys(rowSelection).length > 0 && currentPath === "/jobs/deleted" ? (
                        <Button
                        variant="outline"
                        className="ml-4"
                        onClick={() => changeIsDeleted(rowSelection, data)}
                    >
                    <FolderOutput className="mr-2 h-4 w-4"/>
                        Restore
                    </Button>
                    ) : Object.keys(rowSelection).length > 0 && (
                        <DeleteButton rowSelection={rowSelection} data={data}/>)
                    }
                </form>
            </div>
            <div className="flex gap-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>        
                            <Button 
                            variant={"secondary"}
                            onClick={handleRefreshData}
                            >
                                Refresh
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>refresh to get new posted jobs</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
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
        </div>
    )
}

export default TableTopbar;