import { NextResponse } from "next/server";

import pool from '../../../lib/db';


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

// Update submission time
export async function PATCH(request: Request) {
    const data: Job = await request.json()
    const { id, submission_time, status } = data

    if ( !id ) {
        return NextResponse.json({ error: 'Missing required data: id' }, { status: 422 })
    }

    // check if job with id=id exists
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

    // update submission time as current time
    try {
        const query = `UPDATE jobs
                        SET submission_time = ($1), 
                            application_status = ($2)
                        WHERE id = ($3)`;
    
        await pool.query(query, [submission_time, status, id]);
        return NextResponse.json({ message: 'Submittion time updated successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}
