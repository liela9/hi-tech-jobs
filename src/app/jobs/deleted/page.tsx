import React from 'react'

const JobsList = React.lazy(() => import("@/components/JobsList")) 


export default function DeletedJobsPage() {
  const url = '/api/jobs/deleted'

  return (
    <JobsList url={url}/>
  );
}