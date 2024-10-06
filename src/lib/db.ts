import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT? +process.env.DB_PORT: 5432
});

export default pool;