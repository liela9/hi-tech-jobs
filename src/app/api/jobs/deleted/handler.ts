import { GET } from './route'

import { ROOT_PATH } from '@/lib/utils';


// Get all jobs that was set as deleted
export async function getDeletedJobs() {
  try {
      const response = await GET()
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      return data
  } catch (error) {
    console.error(error);
  } 
}

// Set given jobs as deleted
export async function setAsDeleted(jobs: Job[]) {
    for (const element of jobs) {
      try {
        await fetch(`${ROOT_PATH}/api/jobs/deleted`, {
            method: 'DELETE',
            body: JSON.stringify({ id: element.id })
        })
      } catch (error) {
        console.log(`Error message: `, error);
      }
    }
  }