import axios from 'axios'
import path from 'path'
import fs from 'fs'
import Papa from 'papaparse'

import { CATEGORIES } from '@/lib/utils'

const OUTPUT_PATH = 'data/'
const PATH = 'https://raw.githubusercontent.com/mluggy/techmap/main/jobs/';

async function getData(filename: string) {
  try{
    const response = await axios.get(`${PATH}${filename}`);
    const content = response.data;
  
    fs.writeFileSync(path.join(OUTPUT_PATH, filename), content, 'utf-8');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

export async function fetchAllFiles() {
  for (const c of CATEGORIES) {
    await getData(`${c}.csv`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
  }
}

export function loadData() {
  return CATEGORIES.map(category => {
    try {
      const csvPath = path.join(OUTPUT_PATH, `${category}.csv`);
      const csvFile = fs.readFileSync(csvPath, 'utf-8');
      const parsedData: any[] = Papa.parse(csvFile, { header: true }).data;
      return parsedData.map(item => ({
        ...item,
        department: category,
        title: item.title?.toLowerCase(),
        company: item.company?.toLowerCase(),
        city: item.city?.toLowerCase(),
        level: item.level?.toLowerCase(),
        url: canonicalizeUrl(item.url),
      }));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
}

function canonicalizeUrl(url: string) {
  const parsedUrl = new URL(url);
  let netloc = parsedUrl.hostname.toLowerCase();

  if (netloc.startsWith('www.')) {
    netloc = netloc.substring(4);
  }
  if (netloc === 'il.linkedin.com') {
    netloc = 'linkedin.com';
  }

  parsedUrl.hostname = netloc;
  return parsedUrl.toString();
}

// Filter data to include items matching the keywords
export function filterByKeywords(data: Job[], keywords: string[]): Job[] {
  const regex = new RegExp(keywords.join('|'), 'i')
  return data.filter(item => regex.test(item.title))
}

// Filter data to exclude items matching the blacklist
export function filterOutBlacklist(data: Job[], blacklist: string[]): Job[] {
  const regex = new RegExp(blacklist.join('|'), 'i')
  return data.filter(item => !regex.test(item.title))
}
