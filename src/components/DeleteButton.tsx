import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import { changeIsDeleted } from "@/lib/utils"

interface DeleteButtonProps {
    rowSelection?: {[key: string]: boolean};
    data: Job[];
}

function DeleteButton({rowSelection, data}: DeleteButtonProps) {
    return (
        <Button
            variant="destructive"
            className="ml-4"
            onClick={() => changeIsDeleted(rowSelection, data)}
            >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
        </Button>
    )
}

export default DeleteButton;