'use client'

import React, { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client';

const JobsTable = React.lazy(() => import("./jobsTable")) 

interface JobsListProps {
  url: string;
}

export default function JobsList({ url }: JobsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
      console.log('WebSocket connected');

      if ( url === '/api/jobs') {
        socket.on('get-all-jobs', (allJobs) => {
          setJobs(allJobs)
        })
      }

      if ( url === '/api/jobs/submitted') {
        socket.on('get-submitted-jobs', (submittedJobs) => {
          setJobs(submittedJobs)
        })
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on("job-updated", (updatedJobs: Job[]) => {
      setJobs(updatedJobs);
    });
    
    return () => {
      socket.off("job-updated");
    };
  }, []);

  return (
    <JobsTable jobs={jobs} currentPath={url.slice(4)} ></JobsTable>
  )
}
