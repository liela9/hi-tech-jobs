import { ROOT_PATH } from "@/lib/utils";

interface FilterLayoutProps {
    includes: string[];
    excludes: string[];
}

async function postUserPreferences(includes: string[], excludes: string[]) {
    console.log('in postUserPreferences: ', includes, excludes)
    try {
      await fetch(`${ROOT_PATH}/api/user`, {
        method: 'POST',
        body: JSON.stringify({ includes: includes, excludes: excludes}),
      })
    } catch (error) {
      console.log(`Error message: `, error);
    }
  }
  
  async function loadJobs(includes: string[], excludes: string[]) {
    try {
      // read data from source
      const encodedData = JSON.stringify({ keywords: includes, blacklist: excludes })
      const res = await fetch(`${ROOT_PATH}/api/initialization?data=${encodedData}`, {
        method: 'GET',
      })
      
      const jobs = await res.json()
      console.log('jobs:', jobs[0])
  
      // // insert data to DB
      // await fetch(`${ROOT_PATH}/api/jobs`, {
      //   method: 'POST',
      //   body: JSON.stringify({ jobs: jobs }),
      // })
    } catch (error) {
      console.log(`Error message: `, error);
    }
}

export default function FilterLayout({includes, excludes}: FilterLayoutProps) {
    const handleSubmit = () => {
        // Save user preferences in the database
        postUserPreferences(includes, excludes)
    
        // Fill database with jobs
        loadJobs(includes, excludes)
    };

    return (
        <div>
            FilterLayout
        </div>
    )
}