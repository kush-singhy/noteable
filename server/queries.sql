CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)

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
);


-- Insert sample users
INSERT INTO users (email, password) VALUES
('alice@example.com', 'password123'),
('bob@example.com', 'securepass456'),
('charlie@example.com', 'charliepass789')

INSERT INTO book_notes (user_id, title, author, isbn, status, read_date, rating, note)
VALUES
(1, 'To Kill a Mockingbird', 'Harper Lee', '9780060935467', 'Read', '2023-01-15', 5, '<p>A powerful book about justice and morality.</p>'),
(1, '1984', 'George Orwell', '9780451524935', 'Reading', NULL, NULL, NULL),
(2, 'The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Read', '2022-11-20', 4, '<p>Beautifully written with complex characters.</p>'),
(3, 'Moby Dick', 'Herman Melville', '9781503280786', 'To Read', NULL, NULL, NULL),
(3, 'Pride and Prejudice', 'Jane Austen', '9781503290563', 'Read', '2023-05-05', 5, '<p>A timeless romance with sharp wit.</p>'),
(4, 'The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Read', '2022-11-20', 4, '<p>Beautifully written with complex characters.</p>'),
(4, 'Moby Dick', 'Herman Melville', '9781503280786', 'To Read', NULL, NULL, NULL),
(4, 'Pride and Prejudice', 'Jane Austen', '9781503290563', 'Read', '2023-05-05', 5, '<p>A timeless romance with sharp wit.</p>');