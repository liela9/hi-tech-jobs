'use client'

import React, { useEffect, useState } from 'react'

import JobsTable from './jobsTable';


interface JobsListProps {
  url: string;
}


export default function JobsList({ url }: JobsListProps) {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await fetch(url);
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
      <JobsTable jobs={jobs} currentPath={url.slice(4)} ></JobsTable>
    )
}
