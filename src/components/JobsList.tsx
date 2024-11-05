'use client'

import React, { useEffect, useState } from 'react'

import { socket } from "../socket";

const JobsTable = React.lazy(() => import("./jobsTable")) 

interface JobsListProps {
  url: string;
}

export default function JobsList({ url }: JobsListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Listen for updates from the WebSocket
    socket.on("jobsUpdated", (updatedJobs) => {
      console.log(updatedJobs)
      setJobs(updatedJobs);
    });
    
    return () => {
      socket.off("jobsUpdated");
    };
  }, []);

  return (
    <JobsTable jobs={jobs} currentPath={url.slice(4)} ></JobsTable>
  )
}
