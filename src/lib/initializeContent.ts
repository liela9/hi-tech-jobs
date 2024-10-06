import pool from '../lib/db';
import fetchAllJobs from './getAllJobs';


const initializeContent = async () => {
    const jobs = await fetchAllJobs()

    try {
        for (const job of jobs) {
            const query = `
            INSERT INTO all_jobs (title, company, category, city, level, url, updated)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO NOTHING;  -- To avoid duplicate ID insertion
            `;
            const values = [job.title, job.company, job.category, job.city, job.level, job.url, job.updated];

            await pool.query(query, values); 
        }
    } catch (err) {
        console.error('Error initializing content:', err);
    }
};

initializeContent();
