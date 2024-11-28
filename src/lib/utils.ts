import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ROOT_PATH = 'http://localhost:3000'

export async function turnIsDeleted(jobs: Job[]) {
  for (const element of jobs) {
    try {
      await fetch(`${ROOT_PATH}/api/jobs/deleted`, {
          method: 'PATCH',
          body: JSON.stringify({ id: element.id })
      })
    } catch (error) {
      console.log(`Error message: `, error);
    }
  }
}

export const changeIsDeleted = (rowSelection: {[key: string]: boolean}, data: Job[]) => {
  const selectedRowIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);
  const selectedRowsData = selectedRowIds.map((id) => data[parseInt(id)]);
  
  turnIsDeleted(selectedRowsData)
}