import { ROOT_PATH } from '@/lib/utils'

export async function getJobs() {
  try {
    const response = await fetch(`${ROOT_PATH}/api/jobs`, {
      method: 'GET',
    })

    return await response.json();
  } catch (error) {
    console.error(error);
  } 
}
