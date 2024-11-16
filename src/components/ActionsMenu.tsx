import React from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
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

export async function updateSubmissionTime(row: Job) {
    const { id } = row
    const currentTime = getTime()
    const status = 'submitted'

    try {
      const res = await fetch(ROOT_PATH + '/jobs', {
          method: 'PATCH',
          body: JSON.stringify({ id, currentTime, status })
      })
      await res.json()
    } catch (error) {
      console.log(`Error message: `, error);
    }
}
  
function ActionsMenu(row: Job) {
    const [submittedChecked, setSubmittedChecked] = React.useState(false)

    const handleSubmittedChange = async (checked: boolean) => {
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
              onCheckedChange={(isChecked) => {
                handleSubmittedChange(isChecked)
              }}
            >
              In Submitted List
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionsMenu;