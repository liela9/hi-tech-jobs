import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ROOT_PATH = 'http://localhost:3000'
export const CATEGORIES = [
  'data-science',
  'frontend',
  'hardware',
  'qa',
  'security',
  'software',
  'support',
]

export async function turnIsDeleted(jobs: Job[]) {
  for (const element of jobs) {
    console.log('element.id:', element.id)
    try {
      await fetch(`${ROOT_PATH}/api/jobs/deleted`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },      
          body: JSON.stringify({ id: element.id })
      })
    } catch (error) {
      console.error(`Error message: `, error);
    }
  }
}

export const changeIsDeleted = (rowSelection: {[key: string]: boolean} | undefined, data: Job[]) => {
  if (rowSelection) {
    const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);
    const selectedRowsData = selectedRowIds.map((id) => data[parseInt(id)]);
  
    turnIsDeleted(selectedRowsData)
  } else {
    turnIsDeleted(data)
  }
  // TODO: Fix that
  // // refresh the browser for upodated jobs in table (curently causes SyntaxError: Unexpected end of JSON input (at api/jobs/deleted/route.ts?d997:22:32)) 
  // window.location.reload();
}
