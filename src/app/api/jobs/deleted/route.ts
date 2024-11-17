import { NextResponse } from "next/server";

import pool from '../../../../lib/db';


// Get all deleted jobs
export async function GET() {
    try {
        const result = await pool.query(
            `SELECT * FROM jobs
            WHERE isDeleted = true`
        );

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}

// Set job as deleted
export async function DELETE(request: Request) {
    const data: Job = await request.json()
    const { id } = data

    try {
        const query = `UPDATE jobs
                       SET isDeleted = true
                       WHERE id = ($1)`;
    
        await pool.query(query, [id]);
        return NextResponse.json({ message: 'Updated successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}