import React from 'react'

const JobsList = React.lazy(() => import("@/components/JobsList")) 

export default async function DeletedJobsPage() {
  return (
    <JobsList url='/api/jobs/deleted'/>
  );
}