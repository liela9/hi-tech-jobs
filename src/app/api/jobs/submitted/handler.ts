import { GET } from './route'


export default async function getSubmittedJobs() {
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