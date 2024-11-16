import React, { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit } from "lucide-react"

import { ROOT_PATH } from "@/lib/utils"

const statuses = ['New', 'Submitted', 'Passed-first-assessment', 'Passed-second-assessment', 'Passed-third-assessment', 'Hired']

interface EditDialogProps {
  job: Job;
}

export async function updateJob(jobId: string, referrerName: string, status: string) {
  try {
    const res = await fetch(`${ROOT_PATH}/api/jobs/submitted`, {
      method: 'PATCH',
      body: JSON.stringify({ id: jobId, referrer: referrerName, status: status })
    })
  } catch (error) {
    console.log(`Error message: `, error);
  }
}

function EditDialog({ job }: EditDialogProps) {
  const [referrerName, setReferrerName] = useState("")
  const [status, setStatus] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReferrerName(event.target.value)
  }

  const handleValueChange = (value: string) => {
    setStatus(value)
  }

  const handleSaveChanges = () => {
    updateJob(job.id, referrerName, status)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <Edit className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Job Details</DialogTitle>
          <DialogDescription>
            Edit the name of the employee that referred you to this role and the status of the application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
                Referrer
            </Label>
            <Input 
              className="col-span-3" 
              value={referrerName}
              onChange={handleInputChange}
              placeholder="Referrer name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={handleValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                    {statuses.map((status) => (
                        <SelectItem
                            key={status}
                            value={status.toString()}
                        >
                            {status}
                        </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditDialog;