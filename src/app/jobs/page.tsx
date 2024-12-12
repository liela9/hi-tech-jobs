import React from "react"

import { getUserPreferences } from "../api/filter/handler"

const JobsList = React.lazy(() => import("@/components/JobsList"))


export default async function AllJobsPage() {
  const preferences: UserPreferences | undefined = await getUserPreferences()
  
  console.log('in AllJobsPage: ', preferences)
  if (preferences) {

    return (
      <JobsList url='/api/jobs' categories={['qaswvfqw']}/>
    );
  }
}
