import { NextResponse } from "next/server";

import pool from '../../../../lib/db';
import { title } from "process";


// Get all submitted jobs
export async function GET() {
    try {
        const result = await pool.query(
            `SELECT * FROM jobs
            WHERE application_status <> 'new'`
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    }
}

// TODO: check if needed
// Delete row from jobs table
export async function DELETE(request: Request) {
    const data: Job = await request.json()
    const { id } = data
    // console.log('data: ', data)

    try {
        const query = `DELETE FROM jobs
                       WHERE id = ($1)`;
    
        await pool.query(query, [id]);
        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    }
}
