import { GET } from './route'


export default async function getJobs() {
  try {
      const response = await GET()
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return await response.json();
  } catch (error) {
    console.error(error);
  } 
}