'use client'

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
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

import { ROOT_PATH } from "@/lib/utils"
import { useEffect, useState } from 'react'


async function updateSubmissionTime() {
    console.log('in updateSubmissionTime')
}

export default function TempPage() {
    const [jobs, setJobs] = useState<Job[]>([]);

    const [submittedChecked, setSubmittedChecked] = React.useState(false)

    const handleSubmittedChange = async (checked: boolean) => {
        console.log('in handleSubmittedChange')
        updateSubmissionTime()
        setSubmittedChecked(checked) 
    } 

    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const response = await fetch('/api/temp');
            if (!response.ok) {
              throw new Error('Failed to fetch jobs');
            }
            const data = await response.json();
            setJobs(data);
          } catch (error) {
              console.error(error);
          }
    
        }
  
        fetchJobs();
    }, []);


    return (
        // <div>
        //     <h1>{jobs.length}</h1>
        // </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )

    
    // return (
    //     <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //       <Button variant="ghost" className="h-8 w-8 p-0">
    //         <span className="sr-only">Open menu</span>
    //         <MoreHorizontal className="h-4 w-4" />
    //       </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent align="end">
    //       <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //       <DropdownMenuSeparator />
    //       <DropdownMenuCheckboxItem
    //         checked={submittedChecked}
    //         onCheckedChange={handleSubmittedChange}
    //       >
            
    //         In Submitted List
    //       </DropdownMenuCheckboxItem>

    //         <DropdownMenuCheckboxItem>
    //             <form action={updateSubmissionTime}>
    //                 <button type="submit">Update</button>
    //             </form>
    //         </DropdownMenuCheckboxItem>

    //     </DropdownMenuContent>
    //   </DropdownMenu>
    // );
}
