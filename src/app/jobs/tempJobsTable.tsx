import { Job } from "./jobsTypes"
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,        
    TableRow,
} from "@/components/ui/table"  

interface JobsTableProps {
    jobs: Job[];
}

const JobsTable = ({ jobs }: JobsTableProps) => {
  return (
    <div className="max-h-screen overflow-h-auto border-2 rounded-md p-4">
      <Table>
        {/* <TableCaption></TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-left">City</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {jobs?.map(job => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.city}</TableCell>
                <TableCell>{job.url}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Heart className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  )

}

export default JobsTable

