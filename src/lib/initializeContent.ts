import pool from '../lib/db';
import fetchAllJobs from './getAllJobs';


const initializeContent = async () => {
    const jobs = await fetchAllJobs()

    try {
        for (const job of jobs) {
            const query = `
            INSERT INTO jobs (title, company, department, city, level, url)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (id) DO NOTHING;  -- To avoid duplicate ID insertion
            `;
            const values = [job.title, job.company, job.department, job.city, job.level, job.url];

            await pool.query(query, values); 
        }
    } catch (err) {
        console.error('Error initializing content:', err);
    }
};

initializeContent();
