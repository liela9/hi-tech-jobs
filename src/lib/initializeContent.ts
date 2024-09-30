import { Client } from 'pg';
import fetchAllJobs from './getAllJobs';


exports.initializeContent = async (client: Client) => {
    const jobs = await fetchAllJobs()
    try {
        await client.query('BEGIN');

        for (const job of jobs) {
            const query = `
            INSERT INTO all_jobs (title, company, category, city, level, url, updated)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (id) DO NOTHING;  -- To avoid duplicate ID insertion
            `;
            const values = [job.title, job.company, job.category, job.city, job.level, job.url, job.updated];

            await client.query(query, values); 
        }

        await client.query('COMMIT'); 
    } catch (err) {
        await client.query('ROLLBACK'); // Rollback if there is an error
        console.error('Error initializing content, rolling back:', err);
    }
};
