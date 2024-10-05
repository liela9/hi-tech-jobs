const { pool } = require('../lib/db.js');
const { initializeContent } = require('../lib/initializeContent');


const initializeDb = async () => {
  try {
    // Initialize database tables
    const allJobsQuery = 
    `CREATE table IF NOT EXISTS all_jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        level VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        updated VARCHAR(255) NOT NULL
      );
      commit;
    `;
  
    const submittedJobsQuery = 
    `CREATE table IF NOT EXISTS submitted_jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        level VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        submition_time VARCHAR(255) NOT NULL
      );`
    ;
  
    await pool.query(allJobsQuery);
    await pool.query(submittedJobsQuery);
    console.log('Tables initialized');

    // Initialize content
    await initializeContent(pool);
    console.log('Jobs content initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
};

initializeDb();
