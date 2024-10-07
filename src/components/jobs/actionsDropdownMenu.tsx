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


async function removeFromList(listName: string, row: Job) {
    const { id, title,  company, category, city, level, url } = row

    if (listName === "submitted_jobs") {
        const resDelete = await fetch(ROOT_PATH + 'jobs/submitted', {
          method: 'DELETE',
          body: JSON.stringify({ id })
        })
        await resDelete.json()

        const resInsert = await fetch(ROOT_PATH + 'jobs', {
            method: 'POST',
            body: JSON.stringify({ title,  company, category, city, level, url })
        })
        await resInsert.json()
    } else {
        const resDelete = await fetch(ROOT_PATH + 'jobs', {
            method: 'DELETE',
            body: JSON.stringify({ id })
          })
          await resDelete.json()
  
        const currentTime = new Date().getTime()
        const resInsert = await fetch(ROOT_PATH + 'jobs/submitted', {
            method: 'POST',
            body: JSON.stringify({ title,  company, category, city, level, url, currentTime })
        })
        await resInsert.json()
    }
}
  
function ActionsDropdownMenu(row: Job) {
    const [submittedChecked, setSubmittedChecked] = React.useState(false)

    const handleSubmittedChange = async (checked: boolean) => {
        // console.log(('in handleSubmittedChange'))
        // if (checked){ 
        //     //in case the checkbox is checked, move the job from submitted_jobs back to all_jobs
        //     console.log(('back to main list (to all jobs)'))
        //     removeFromList("submitted_jobs", row)
        // }else{ 
        //     //in case the checkbox is NOT checked, move from all_jobs to submitted_jobs
        //     console.log('moving to submitted list')
        //     removeFromList("all_jobs", row)
        // }
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