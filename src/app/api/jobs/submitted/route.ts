import { NextResponse } from "next/server";

import pool from '../../../../lib/db';


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


export async function POST(request: Request) {
    const data: Job = await request.json()
    console.log('data: ', data)

    const { title, company, category, city, level, url, updated } = data
    const query = `INSERT INTO submitted_jobs (title, company, category, city, level, url, updated)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    ON CONFLICT (id) DO NOTHING;  -- To avoid duplicate ID insertion`;
    const values = [title, company, category, city, level, url, updated];

    await pool.query(query, values);
}
