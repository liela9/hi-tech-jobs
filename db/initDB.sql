-- For every change in EXISTING table run (uncomment):
--DROP TABLE jobs;
--DROP TABLE includes;
--DROP TABLE excludes;
--DROP TABLE categories;

CREATE table IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    submition_time VARCHAR(255) default '0' NOT NULL,
    referrer VARCHAR(255) default 'None',
    application_status VARCHAR(255) default 'new',
    isDeleted BOOLEAN default false
);   

CREATE table IF NOT EXISTS includes (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL
);  

CREATE table IF NOT EXISTS excludes (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL
);  

CREATE table IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL
); 

-- DELETE FROM jobs;
