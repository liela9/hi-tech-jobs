import axios from 'axios'
import path from 'path'
import fs from 'fs'
import Papa from 'papaparse'

import { CATEGORIES } from './utils'
const OUTPUT_PATH = 'data/'

const PATH = 'https://raw.githubusercontent.com/mluggy/techmap/main/jobs/';

async function getData(filename: string) {
  const response = await axios.get(`${PATH}${filename}`);
  const content = response.data;

  fs.writeFileSync(path.join(OUTPUT_PATH, filename), content, 'utf-8');
}

async function fetchAllFiles() {
  for (const c of CATEGORIES) {
    await getData(`${c}.csv`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
  }
}

function loadData() {
  return CATEGORIES.map(category => {
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

function levelFilter(data: Job[]): Job[] {
  return data.filter(item =>
    /engineer|representative|student/.test(item.level)
  );
}

function wordFilter(data: Job[]): Job[] {
  const blacklist = ['senior', 'manager', 'leader', "architect", "principal"];
  return data.filter(item =>
    !blacklist.some(word => new RegExp(word, 'i').test(item.title))
  );
}

export default async function fetchAllJobs(): Promise<Job[]> {
  await fetchAllFiles();
  const data = loadData().flat();
  let filteredData = levelFilter(data);
  filteredData = wordFilter(filteredData);

  return filteredData
}
