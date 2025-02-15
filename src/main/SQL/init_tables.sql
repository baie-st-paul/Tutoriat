DROP TABLE IF EXISTS users;


CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type SMALLINT NOT NULL
);

CREATE TABLE user_types (
    id SMALLINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO user_types (id, name)
VALUES (1, 'Student'),
       (2, 'Teacher');

CREATE TABLE teachers (
    email VARCHAR(255) PRIMARY KEY REFERENCES users(email)
);

CREATE TABLE students (
    email VARCHAR(255) PRIMARY KEY REFERENCES users(email)
);

CREATE TABLE teaching_subjects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    teacher_email VARCHAR(255) REFERENCES teachers(email)
);