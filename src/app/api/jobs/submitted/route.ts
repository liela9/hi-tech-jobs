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