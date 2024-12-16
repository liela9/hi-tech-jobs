import { ChevronDown, FolderOutput } from "lucide-react"
import { Table } from "@tanstack/react-table"
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
import { useToast } from "@/hooks/use-toast"

import DeleteButton from "./DeleteButton"
import { changeIsDeleted } from "@/lib/utils"
import { getUserPreferences } from "@/app/api/filter/handler"
import { ROOT_PATH } from "@/lib/utils"

interface TableTopbarProps {
    table: Table<Job>;
    rowSelection: {[key: string]: boolean};
    data: Job[];
    currentPath: string;
}

async function handleRefreshData(): Promise<void> {
    const preferences = await getUserPreferences()

    if (preferences) {
        try {
            const encodedData = JSON.stringify({ 
                keywords: preferences.includes, 
                blacklist: preferences.excludes, 
                categories: preferences.categories 
            })

            // read jobs from source
            const res = await fetch(`${ROOT_PATH}/api/initialization?data=${encodedData}`, {
                method: 'GET',
            })
    
            const jobs = await res.json()
    
            // insert data to DB
            await fetch(`${ROOT_PATH}/api/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({ jobs: jobs }),
            })
        } catch (error) {
            console.error(`Error message: `, error);
        }
    }
}

function TableTopbar({table, rowSelection, data, currentPath}: TableTopbarProps) {
    const { toast } = useToast()

    const handleRestore = () => {
        changeIsDeleted(rowSelection, data)
        
        toast({
            title: "Job(s) restored to main list!",
            description: (
                <div>
                    <p>Refresh the browser for updated list.</p>
                    <p className="font-bold">Make sure you clicked once.</p>
                </div>
            ),
            duration: 5000,
            className: "bg-white",
        })
    }

    return (
        <div className="flex py-4 justify-between">
            <div className="flex flex-initial w-full gap-4">
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
                        type="button"
                        variant="outline"
                        className="ml-4"
                        onClick={handleRestore}
                    >
                    <FolderOutput className="mr-2 h-4 w-4"/>
                        Restore
                    </Button>
                    ) : Object.keys(rowSelection).length > 0 && (
                        <DeleteButton rowSelection={rowSelection} data={data}/>)
                    }
                </form>
            </div>
            {currentPath === "/jobs" && (
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
                            <p>Refresh to get new posted jobs</p>
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
            </div>)}
        </div>
    )
}

export default TableTopbar;