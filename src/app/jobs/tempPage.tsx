import React from 'react'
import { Job } from "./jobsTypes"
import JobsTable from './tempJobsTable'
import axios from 'axios'
import path from 'path'
import fs from 'fs'
import Papa from 'papaparse'


const OUTPUT_PATH = '/Users/lahar/Documents/Development/jobs-app/src/app/jobs/data'
const CATEGORIES = [
  'data-science',
  // 'frontend',
  // 'hardware',
  // 'qa',
  // 'security',
  // 'software',
  // 'support',
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
  let parsedUrl = new URL(url);
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


function transformData(data: any[]) {
  return data.map(item => ({
    ...item,
    category: item.category?.toLowerCase(),
    company: item.company?.toLowerCase(),
    title: item.title?.toLowerCase(),
    level: item.level?.toLowerCase(),
    url: canonicalizeUrl(item.url),
  }));
}

function levelFilter(data: any[]) {
  return data.filter(item =>
    /engineer|representative|student/.test(item.level)
  );
}

function wordFilter(data: any[]) {
  const blacklist = ['senior', 'manager'];
  return data.filter(item =>
    !blacklist.some(word => new RegExp(word, 'i').test(item.title))
  );
}


const JobsPage = async () => {
  // const res = await fetch(
  //   'https://jsonplaceholder.typicode.com/posts',
  //   { next: { revalidate: 24 * 3600}},// Gets fresh data every 24 hours
  // ); 

  await fetchAllFiles();
  let data = loadData().flat();
  data = transformData(data);
  data = levelFilter(data);
  data = wordFilter(data);

  return (
    <div className='items-center w-full'>
      <JobsTable jobs={data}></JobsTable>
    </div>
  )
}

export default JobsPage