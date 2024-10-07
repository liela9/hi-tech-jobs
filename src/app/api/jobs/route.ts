import { NextResponse } from "next/server";

import pool from '../../../lib/db';

  
export async function GET() {
    try {
        const result = await pool.query(
            'SELECT * FROM all_jobs'
        );
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    }
}

// Insert new row to all_jobs table
export async function POST(request: Request) {
    const data: Job = await request.json()
    console.log('data: ', data)

    try {
        const { title, company, category, city, level, url } = data
        const query = `INSERT INTO all_jobs (title, company, category, city, level, url)
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

// Delete row from all_jobs table
export async function DELETE(request: Request) {
    const data: Job = await request.json()
    const { id } = data
    console.log('data: ', data)

    try {
        const query = `DELETE FROM all_jobs
                       WHERE id = ($1)`;
    
        await pool.query(query, [id]);
        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    }
}