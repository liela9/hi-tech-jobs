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
} from "@/components/ui/dropdown-menu"

import { ROOT_PATH } from "@/lib/utils"
import DeleteButton from "./DeleteButton"


function getTime(): string {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

function ActionsMenu(row: Job) { 
  const updateSubmitionTime = async (row: Job) => {
    const { id } = row
    const currentTime = getTime()
    const status = 'applied'
    
    try {
      await fetch(`${ROOT_PATH}/api/jobs`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ id: id, submition_time: currentTime, status: status })
      })

      window.location.reload();
    } catch (error) {
      console.error(`Error message: `, error);
    }
  }

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
          <DropdownMenuItem>
            <Button variant='ghost' onClick={() => {updateSubmitionTime(row)}}>Submitted</Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DeleteButton data={[row]}/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default ActionsMenu;