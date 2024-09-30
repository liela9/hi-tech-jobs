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