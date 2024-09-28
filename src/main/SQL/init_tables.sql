DROP TABLE IF EXISTS users;


CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE teachers (
    email VARCHAR(255) PRIMARY KEY REFERENCES users(email)
);

CREATE TABLE students (
    email VARCHAR(255) PRIMARY KEY REFERENCES users(email)
);

CREATE TABLE teaching_subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    teacher_email VARCHAR(255) REFERENCES teachers(email)
);