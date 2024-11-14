import { DatabaseChangeEmitter } from './DatabaseChangeEmitter';

const dbEmitter = new DatabaseChangeEmitter({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function main() {
  try {
    await dbEmitter.connect();
    await dbEmitter.watchTable('jobs');
    console.log('>>>>>>>>in notifications')
    
    // Listen for changes with type safety
    dbEmitter.on('change', (change) => {
      console.log('Change detected: ', {
        operation: change.operation,  // 'INSERT' | 'UPDATE' | 'DELETE'
        table: change.table,
        data: change.data
      });
    });

    dbEmitter.on('error', (error) => {
      console.error('Error occurred:', error.message);
    });
    
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
    await dbEmitter.disconnect();
  }
}

main();