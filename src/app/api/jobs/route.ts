import { NextResponse } from "next/server";

import pool from '../../../lib/db';
import { error } from "console";


// Get all new jobs
export async function GET() {
    try {
        const result = await pool.query(
            `SELECT * FROM jobs
            WHERE submission_time = '0'`
        );
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred:' + error }, { status: 500 });
    }
}

// Update submittion time
export async function PUT(request: Request) {
    const data: Job = await request.json()
    console.log('data: ', data)
    const { id, submission_time } = data

    if ( !id ) {
        return NextResponse.json({ error: 'Missing required data: id' }, { status: 422 })
    }

    try {
        const query = `SELECT * FROM jobs
                        WHERE id = ($1)`;
    
        const result = await pool.query(query, [id]);
        if ( result.rows.length === 0 ) {
            throw new Error()
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Job id does not exist' }, { status: 404 });
    }

    try {
        const query = `UPDATE jobs
                        SET submission_time = ($1)
                        WHERE id = ($2)`;
    
        await pool.query(query, [submission_time, id]);
        return NextResponse.json({ message: 'Submittion time updated successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred:' + error }, { status: 500 });
    }
}

// TODO: check if needed
// Delete row from jobs table
export async function DELETE(request: Request) {
    const data: Job = await request.json()
    const { id } = data
    console.log('data: ', data)

    try {
        const query = `DELETE FROM jobs
                       WHERE id = ($1)`;
    
        await pool.query(query, [id]);
        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred:' + error }, { status: 500 });
    }
}