import React from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ROOT_PATH } from "@/lib/utils"


function getTime() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

export async function updateSubmitionTime(row: Job) {
    const { id } = row
    const currentTime = getTime()
    const status = 'applied'
    
    try {
      await fetch(`${ROOT_PATH}/api/jobs`, {
          method: 'PATCH',
          body: JSON.stringify({ id: id, submition_time: currentTime, status: status })
      })
    } catch (error) {
      console.log(`Error message: `, error);
    }
}
  
function ActionsMenu(row: Job) {
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button variant='ghost' onClick={() => {updateSubmitionTime(row)}}>Submitted</Button>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionsMenu;