import { NextResponse } from "next/server";

import pool from '../../../../lib/db';

// TODO: change WHERE submission_time <> '0'` to WHERE application_status <> 'new'`
// Get all submitted jobs
export async function GET() {
    try {
        const result = await pool.query(
            `SELECT * FROM jobs
            WHERE submission_time <> '0'`
        );

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}

// Update referrer or/and status
export async function PATCH(request: Request) {
    const data: Job = await request.json()
    const { id, referrer, status } = data

    if ( !id ) {
        return NextResponse.json({ error: 'Missing required data: id' }, { status: 422 })
    }

    // check if job with id=id exists
    try {
        const query = `SELECT * FROM jobs
                        WHERE id = ($1)`;
    
        const result = await pool.query(query, [id]);
        if ( result.rows.length === 0 ) {
            return NextResponse.json({ error: `Job with id= ${id}`+` does not exist` }, { status: 404 });
        }
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Wrong input: id' }, { status: 400 });
    }

    // update referrer and status if they are not empty
    try {
        const query = `UPDATE jobs
                        SET 
                            referrer = CASE
                                WHEN ($1) != '' THEN ($1)
                                ELSE referrer
                            END,
                            application_status = ($2)
                                WHEN ($2) != '' THEN ($2)
                                ELSE application_status
                            END
                        WHERE id = ($3)`;
    
        await pool.query(query, [referrer, status, id]);
        return NextResponse.json({ message: 'Submittion time updated successfully' }, { status: 200 })
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}
