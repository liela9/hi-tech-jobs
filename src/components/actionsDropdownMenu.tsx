import React from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"

import { ROOT_PATH } from "@/lib/utils"


async function updateSubmissionTime(row: Job) {
    const { id } = row
    const currentTime = new Date().getTime()

    const res = await fetch(ROOT_PATH + '/jobs', {
        method: 'PUT',
        body: JSON.stringify({ id, currentTime })
    })
    await res.json()
}
  
function ActionsDropdownMenu(row: Job) {
    const [submittedChecked, setSubmittedChecked] = React.useState(false)

    const handleSubmittedChange = async (checked: boolean) => {
        console.log(('in handleSubmittedChange'))
        updateSubmissionTime(row)
        setSubmittedChecked(checked) 
    } 

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={submittedChecked}
              onCheckedChange={handleSubmittedChange}
            >
              In Submitted List
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionsDropdownMenu;