import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import { changeIsDeleted } from "@/lib/utils"


function DeleteButton(rowSelection:{[key: string]: boolean}, data: Job[]) {
    return (
        <Button
            variant="destructive"
            className=""
            onClick={() => changeIsDeleted(rowSelection, data)}
            >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
        </Button>
    )
}

export default DeleteButton;