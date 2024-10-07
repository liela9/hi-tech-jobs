import { NextResponse } from "next/server";

import pool from '../../../../lib/db';
import { title } from "process";


// Get all submitted jobs
export async function GET() {
    try {
        const result = await pool.query(
            'SELECT * FROM submitted_jobs'
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    }
}

// Insert new row to submitted_jobs table
export async function POST(request: Request) {
    const data: Job = await request.json()
    console.log('data: ', data)
    const { title, company, category, city, level, url,  } = data

    if ( !title || !company || !category || !city || !level || !url ) {
        return NextResponse.json({ error: 'Missing required data' }, { status: 422 })
    }

    try {
        const query = `INSERT INTO submitted_jobs (title, company, category, city, level, url)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        ON CONFLICT (id) DO NOTHING;  -- To avoid duplicate ID insertion`;
        const values = [title, company, category, city, level, url];
    
        await pool.query(query, values);
        return NextResponse.json({ message: 'Added successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    }
}

// Delete row from submitted_jobs table
export async function DELETE(request: Request) {
    const data: Job = await request.json()
    const { id } = data
    console.log('data: ', data)

    try {
        const query = `DELETE FROM submitted_jobs
                       WHERE id = ($1)`;
    
        await pool.query(query, [id]);
        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    }
}
