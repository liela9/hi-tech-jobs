-- DROP TABLE jobs;

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

DELETE FROM jobs;
