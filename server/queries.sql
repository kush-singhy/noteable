CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT UNIQUE NOT NULL,
    isbn TEXT UNIQUE NOT NULL
)

CREATE TABLE user_notes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    status TEXT NOT NULL,
    read_date DATE,
    rating INTEGER,
    note TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
)

-- Insert sample users
INSERT INTO users (email, password) VALUES
('alice@example.com', 'password123'),
('bob@example.com', 'securepass456'),
('charlie@example.com', 'charliepass789')

-- Insert sample books
INSERT INTO books (title, author, isbn) VALUES
('To Kill a Mockingbird', 'Harper Lee', '9780061120084'),
('1984', 'George Orwell', '9780451524935'),
('Pride and Prejudice', 'Jane Austen', '9780679783268')

-- Insert sample user notes
INSERT INTO user_notes (user_id, book_id, status, read_date, rating, note) VALUES
(1, 1, 'Completed', '2024-01-15', 3, '<p>An inspiring and thought-provoking read.</p>'),
(2, 2, 'To Read', NULL, NULL, NULL),
(3, 3, 'To Read', NULL, NULL, NULL),
(1, 2, 'Completed', '2023-11-10', 4, '<p>A classic that resonates with current times.</p>'),
(2, 3, 'Completed', '2024-03-20', 5, '<p>Loved the character development and wit.</p>')