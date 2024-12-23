import { ROOT_PATH } from "@/lib/utils"

export async function getSubmittedJobs() {
  try {
    const response = await fetch(`${ROOT_PATH}/api/jobs/submitted`, {
      method: 'GET',
    })
    
    return await response.json();
  } catch (error) {
    console.error(error);
  } 
}