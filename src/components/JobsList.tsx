'use client'

import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const JobsTable = React.lazy(() => import("./jobsTable")) 
const DeletedJobsTable = React.lazy(() => import("./deletedJobsTable")) 

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

      if ( url === '/api/jobs/deleted') {
        socket.on('get-deleted-jobs', (deletedJobs) => {
          setJobs(deletedJobs)
        })
      }
    });

    socket.on("job-update", (update) => {
      console.log("Received update:", update);

      // Handle real-time update logic
      if (update.operation === "INSERT") {
        setJobs((prevJobs) => [...prevJobs, update.data]);
      } else if (update.operation === "UPDATE") {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === update.data.id ? { ...job, ...update.data } : job
          )
        );
      } else if (update.operation === "DELETE") {
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job.id !== update.data.id)
        );
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    
    return () => {
      socket.off("job-update");
    };
  }, []);

  
  if ( url === '/api/jobs/deleted') {
    return (
      <DeletedJobsTable jobs={jobs} currentPath={url.slice(4)}/>
    )
  }

  return (
    <JobsTable jobs={jobs} currentPath={url.slice(4)} ></JobsTable>
  )
}
