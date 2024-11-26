import { NextResponse } from "next/server";

import pool from '../../../lib/db';
import fetchAllJobs from "@/lib/getAllJobs";


// Get all new jobs
export async function GET() {
    try {
        const result = await pool.query(
            `SELECT * FROM jobs
            WHERE application_status = 'new' AND isDeleted = false`
        );
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}

// Update submition time
export async function PATCH(request: Request) {
    const data: Job = await request.json()
    const { id, submition_time, status } = data

    if ( !id ) {
        return NextResponse.json({ error: 'Missing required data: id' }, { status: 422 })
    }

    // checks if job with id=id exists
    try {
        const query = `SELECT * FROM jobs
                        WHERE id = ($1)`;
    
        const result = await pool.query(query, [id]);
        if ( result.rows.length === 0 ) {
            return NextResponse.json({ error: `Job with id= ${id}`+` does not exist` }, { status: 404 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Wrong input: id' }, { status: 400 });
    }

    // update submition time as current time
    try {
        const query = `UPDATE jobs
                        SET submition_time = ($1), 
                            application_status = ($2)
                        WHERE id = ($3)`;
    
        await pool.query(query, [submition_time, status, id]);
        return NextResponse.json({ message: 'Submittion time updated successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}


// Insert new jobs
export async function POST(request: Request) {
    const jobs = await fetchAllJobs()

    try {
        for (const job of jobs) {
            const submition_link = job.url
            
            // checks if job exists by url (submition_link)
            const query = `
                SELECT * FROM jobs
                WHERE url = ($1)`;
        
            const result = await pool.query(query, [submition_link]); 
    
            if ( result.rows.length === 0 ) { // if this job is not in the DB
                // insert job
                const query = `
                    INSERT INTO jobs (title, company, department, city, level, url)
                    VALUES ($1, $2, $3, $4, $5, $6)`;
        
                const values = [job.title, job.company, job.department, job.city, job.level, job.url];
                await pool.query(query, values);  
            }
        }
        return NextResponse.json({ message: 'New jobs loaded successfully' }, { status: 200 })
    } catch (error) {
        console.error('Error inserting content:', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}