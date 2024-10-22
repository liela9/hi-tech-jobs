'use client'

import React from "react"

import { ROOT_PATH } from "@/lib/utils"
import { useEffect, useState } from 'react'
const EditDialog = React.lazy(() => import('../../components/EditDialog'));


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
      <EditDialog job={jobs[0]}/>
    )
}
