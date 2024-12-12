import React from 'react'

const JobsList = React.lazy(() => import("@/components/JobsList")) 

export default function SubmittedJobsPage() {
  return (
    <JobsList url='/api/jobs/submitted'/>
  );
}
