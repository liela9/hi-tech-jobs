import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

import { changeIsDeleted } from "@/lib/utils"

interface DeleteButtonProps {
    rowSelection?: {[key: string]: boolean};
    data: Job[];
}

function DeleteButton({rowSelection, data}: DeleteButtonProps) {
    const { toast } = useToast()

    const handleDelete = () => {
        changeIsDeleted(rowSelection, data)
        
        toast({
            title: "Job(s) deleted!",
            description: (
                <div>
                    <p>Refresh the browser for updated list.</p>
                    <p className="font-bold">Make sure you clicked once.</p>
                </div>
            ),
            duration: 5000,
            className: "bg-white text-red-500",
        })
    }

    return (
        <Button
            type="button"
            variant="destructive"
            className="ml-4"
            onClick={handleDelete}
            >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
        </Button>
    )
}

export default DeleteButton;