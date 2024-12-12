import { ROOT_PATH } from "@/lib/utils";

type Keyword = {
  id: number;
  word?: string;
  category?: string;
};

export async function getUserPreferences(): Promise<UserPreferences | undefined>{
  try {
    const response = await fetch(`${ROOT_PATH}/api/filter`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch preferences');
    }

    const data = await response.json()

    const result = {
      includes: data[0].map((item: Keyword) => item.word),
      excludes: data[1].map((item: Keyword) => item.word),
      categories: data[2].map((item: Keyword) => item.category)
    }
    
    return result
  } catch (error) {
    console.error(`Error message: `, error);
  }
}