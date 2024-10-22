import React from "react"


const JobsList = React.lazy(() => import("@/components/JobsList"))

export default function AllJobsPage() {
  const url = '/api/jobs'

  return (
    <JobsList url={url}/>
  );
}
