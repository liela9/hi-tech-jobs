import { NextResponse } from "next/server";

const { connectToDatabase } = require('../lib/db');


// Get all submitted jobs
export async function GET() {
    const client = await connectToDatabase();

    try {
        await client.query('BEGIN'); 

        const result = await client.query(
            'SELECT * FROM submitted_jobs'
        );
        await client.query('COMMIT'); 

        return NextResponse.json(result.rows);
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback if there is an error
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    } finally {
        await client.end();
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