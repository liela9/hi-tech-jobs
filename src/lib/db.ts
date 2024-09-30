import { Client } from 'pg';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables

exports.connectToDatabase = async (): Promise<Client> => {
    const client = new Client({
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT? +process.env.DB_PORT: 5432
    });

    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
    }

    return client;
};
  