import React from "react"

const JobsList = React.lazy(() => import("@/components/JobsList"))

async function AllJobsPage() {
  return (
    <JobsList url='/api/jobs'/>
  );
}

export default AllJobsPage;