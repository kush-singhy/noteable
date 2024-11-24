CREATE DATABASE noteable;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE book_notes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL,
    status TEXT NOT NULL,
    read_date DATE,
    rating INTEGER,
    note TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE (user_id, isbn)
);;