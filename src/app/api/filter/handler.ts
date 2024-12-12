import { error } from "console";

type Keyword = {
  id: number;
  word?: string;
  category?: string;
};

export const ROOT_PATH = 'http://localhost:3000'

export async function getUserPreferences(): Promise<UserPreferences | undefined>{
  try {
    const res = await fetch(`${ROOT_PATH}/api/filter`, {
      method: 'GET',
    })

    const data = await res.json()
    console.log('data:', data)
    const preferences = [...new Set(data.map((pref: Keyword[]) => pref.map((item: Keyword) => item.word)))]
    console.log('in getUserPreferences: ', preferences)

    const result = {
      includes: preferences[0] as string[],
      excludes: preferences[1] as string[],
      categories: [...new Set(data.map((pref: Keyword[]) => pref.map((item: Keyword) => item.category)))][2]  as string[]
    }

    return result
  } catch (error) {
    console.error(`Error message: `, error);
  }
}