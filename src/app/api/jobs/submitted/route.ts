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