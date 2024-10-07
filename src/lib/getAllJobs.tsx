import axios from 'axios'
import path from 'path'
import fs from 'fs'
import Papa from 'papaparse'


const OUTPUT_PATH = 'data/'
const CATEGORIES = [
  // 'data-science',
  // 'frontend',
  // 'hardware',
  // 'qa',
  // 'security',
  // 'software',
  'support',
];

const ROOT_PATH = 'https://raw.githubusercontent.com/mluggy/techmap/main/jobs/';

async function getData(filename: string) {
  const response = await axios.get(`${ROOT_PATH}${filename}`);
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
    return Papa.parse(csvFile, { header: true }).data;
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

function transformData(data: any[]): Job[] {
  return data.map(item => ({
    ...item,
    title: item.title?.toLowerCase(),
    company: item.company?.toLowerCase(),
    category: item.category?.toLowerCase(),
    city: item.city?.toLowerCase(),
    level: item.level?.toLowerCase(),
    url: canonicalizeUrl(item.url),
  }));
}

function levelFilter(data: Job[]): Job[] {
  return data.filter(item =>
    /engineer|representative|student/.test(item.level)
  );
}

function wordFilter(data: Job[]): Job[] {
  const blacklist = ['senior', 'manager', 'leader', "architect", "relocation", "principal"];
  return data.filter(item =>
    !blacklist.some(word => new RegExp(word, 'i').test(item.title))
  );
}

export default async function fetchAllJobs(): Promise<Job[]> {
  await fetchAllFiles();
  const data = loadData().flat();
  const transformedData = transformData(data);
  let filteredData = levelFilter(transformedData);
  filteredData = wordFilter(filteredData);

  // TODO: return ALL the data
  return filteredData.slice(0, 5)
}
