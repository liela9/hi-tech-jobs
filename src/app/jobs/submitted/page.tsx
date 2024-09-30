import React from 'react'
import JobsTable from '../../../components/jobs/jobsTable'
import { ROOT_PATH } from '../../../lib/utils'


const SubmittedJobsPage = async () => {
    const res = await fetch(ROOT_PATH + 'api/jobs/submitted')
    const data = await res.json()
  
    return (
      <div className='items-center w-full'>
        <JobsTable {...data}></JobsTable>
      </div>
    )
}

export default SubmittedJobsPage