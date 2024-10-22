import React, { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
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
  

const statuses = ['New', 'Submitted', 'Passed-first-assessment', 'Passed-second-assessment', 'Passed-third-assessment', 'Hired']

function SubmittedActionsMenu(row: Job) {
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setDropdownMenuOpen(true)}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      {/* render the DropdownMenu conditionally only when its needed. (improving the responsiveness of the page)  */}
      {isDropdownMenuOpen && (
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <DropdownMenuItem>
            
          </DropdownMenuItem>
      </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

export default SubmittedActionsMenu;