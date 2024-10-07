CREATE table IF NOT EXISTS all_jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
);        

CREATE table IF NOT EXISTS submitted_jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    submission_time VARCHAR(255) NOT NULL
);