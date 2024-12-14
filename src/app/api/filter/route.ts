import { NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db";


// Get user preferences
export async function GET() {
    try {
        const includes = await pool.query(`SELECT word FROM includes`);
        const excludes = await pool.query(`SELECT word FROM excludes`);
        const categories = await pool.query(`SELECT category FROM categories`);
 
        const result = [includes.rows, excludes.rows, categories.rows]

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}

// Insert user preferences
export async function POST(request: NextRequest) {
    // reset preferences
    try {
        await pool.query(`DELETE FROM includes`);
        await pool.query(`DELETE FROM excludes`);
        await pool.query(`DELETE FROM categories`);
    } catch (error) {
        console.error('Database error: ', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }

    const data = await request.json()
    const { includes, excludes, categories } = data

    try {
        for (const keyword of includes) {         
            // insert keyword
            const query = `
                INSERT INTO includes (word)
                VALUES ($1)`;
    
            await pool.query(query, [keyword]);  
        }

        for (const keyword of excludes) {         
            // insert keyword
            const query = `
                INSERT INTO excludes (word)
                VALUES ($1)`;

            await pool.query(query, [keyword]);  
        }

        for (const c of categories) {         
            // insert category
            const query = `
                INSERT INTO categories (category)
                VALUES ($1)`;

            await pool.query(query, [c]);  
        }

        return NextResponse.json({ message: 'User preferences loaded successfully' }, { status: 200 })
    } catch (error) {
        console.error('Error inserting content:', error);
        return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 });
    }
}
