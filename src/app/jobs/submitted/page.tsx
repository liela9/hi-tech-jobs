import React from 'react'

const JobsList = React.lazy(() => import("@/components/JobsList")) 


export default function SubmittedJobsPage() {
  const url = '/api/jobs/submitted'

  return (
    <JobsList url={url}/>
  );
}
