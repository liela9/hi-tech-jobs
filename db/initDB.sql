CREATE type status AS ENUM(
    'new', 'submitted', 'passed-first-assessment', 'passed-second-assessment', 'passed-third-assessment', 'hired');

CREATE table IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    submission_time VARCHAR(255) default '0' NOT NULL,
    referrer VARCHAR(255) default 'None',
    application_status status default 'new'
);        

DELETE FROM jobs;