import { NextResponse } from "next/server";

import pool from '../../../../lib/db';


// Get all jobs with specific department
export async function GET(request: Request) {
    const data: Job = await request.json()
    const { department } = data

    try {
        const query = `SELECT * FROM jobs
                        WHERE department = ($1)`;

        const result = await pool.query(query, [department]);
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}
