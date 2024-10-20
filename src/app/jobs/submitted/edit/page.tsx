'use client'

import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
  

const statuses = ['New', 'Submitted', 'Passed-first-assessment', 'Passed-second-assessment', 'Passed-third-assessment', 'Hired']

export default function EditJobPage() {
    const handleSelect = () => {

    }

    const handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(event)
    }

    return (
        <Card className="w-[350px] mt-24">
            <CardHeader>
                <CardTitle>Edit Job Details</CardTitle>
                <CardDescription>Edit the name of the employee that referred you to this role and the status of the application.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Referrer</Label>
                            <Input id="name" placeholder="Name of referrer" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Status</Label>
                            <Select>
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
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Link href='/jobs/submitted'>
                    <Button variant="outline">Cancel</Button>
                </Link>
                <Link href='/jobs/submitted'>
                    <Button onClick={(event) => handleSave(event)}>Save</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
  