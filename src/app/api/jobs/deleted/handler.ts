import { ROOT_PATH } from '@/lib/utils'

export async function getDeletedJobs() {
  try {
    const response = await fetch(`${ROOT_PATH}/api/jobs/deleted`, {
      method: 'GET',
    })
    
    return await response.json();
  } catch (error) {
    console.error(error);
  } 
}