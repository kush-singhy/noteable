import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import pg from 'pg';
import axios from 'axios';
import https from 'https';
import 'dotenv/config';
import GoogleStrategy from 'passport-google-oauth2';
import authRoute from './routes/auth.js';

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: ['noteable'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoute);

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

const port = 3000;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

const apiKey = process.env.API_KEY;
const coverCache = new Map();

// UTILITY FUNCTIONS

async function fetchBookCover(book) {
  if (coverCache.has(book.isbn)) {
    book.cover = coverCache.get(book.isbn);
  } else {
    try {
      const response = await axios.get(
        'https://bookcover.longitood.com/bookcover/' + book.isbn
      );
      const coverUrl = response.data.url;
      coverCache.set(book.isbn, coverUrl);
      book.cover = coverUrl;
    } catch (error) {
      console.error(
        `Error fetching cover for ISBN ${book.isbn}:`,
        error.message
      );
    }
  }
  return book;
}

// ROUTING

app.get('/books', async (req, res) => {
  const userEmail = req.user.email;
  try {
    const result = await db.query(
      `SELECT 
	  		un.id,
	  		b.title,
	  		b.author,
	  		b.isbn,
	  		un.status,
	  		un.read_date,
	  		un.rating,
	  		un.note
  		FROM users u
  		JOIN user_notes un ON u.id = un.user_id
  		JOIN books b ON un.book_id = b.id
  		WHERE u.email = $1`,
      [userEmail]
    );

    const bookList = result.rows;
    const books = await Promise.all(bookList.map(fetchBookCover));

    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Error fetching books');
  }
});

app.post('/book', async (req, res) => {
  const userEmail = req.user.email;
  const { title, author, isbn, readStatus, date, rating, notes } = req.body;
  try {
    const userResult = await db.query('SELECT id FROM users WHERE email = $1', [
      userEmail,
    ]);
    const userId = userResult.rows[0].id;

    const bookResult = await db.query('SELECT id FROM books WHERE isbn = $1', [
      isbn,
    ]);

    let bookId;
    if (bookResult.rows.length > 0) {
      // Book exists
      bookId = bookResult.rows[0].id;
    } else {
      // Insert the book if it doesn't exist
      const insertBookResult = await db.query(
        'INSERT INTO books (title, author, isbn) VALUES ($1, $2, $3) RETURNING id',
        [title, author, isbn]
      );
      bookId = insertBookResult.rows[0].id;
    }

    if (readStatus === 'Completed') {
      await db.query(
        `INSERT INTO user_notes (user_id, book_id, status, read_date, rating, note)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId, bookId, readStatus, date, rating, notes]
      );
    } else {
      await db.query(
        `INSERT INTO user_notes (user_id, book_id, status)
        VALUES ($1, $2, $3)`,
        [userId, bookId, readStatus]
      );
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error adding book');
  }
});

app.post('/search', async (req, res) => {
  const { input } = req.body;

  if (input === '') {
    res.sendStatus(200);
  } else {
    const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${input}&key=${apiKey}&maxResults=8`;
    try {
      const response = await axios.get(searchURL, { httpsAgent: agent });
      const results = response.data.items;
      const filteredResults = results.map((result) => {
        const title = result.volumeInfo.title || 'NA';

        const authorList = result.volumeInfo.authors || null;
        const author =
          authorList && authorList.length > 0 ? authorList[0] : 'NA';

        const industryIdentifiers =
          result.volumeInfo.industryIdentifiers || null;
        const isbn13 = industryIdentifiers
          ? industryIdentifiers.find(
              (identifier) => identifier.type === 'ISBN_13'
            )
          : null;
        const isbn = isbn13 ? isbn13.identifier : 'NA';

        return { title, author, isbn };
      });
      res.json(filteredResults);
    } catch (error) {
      console.error('Error searching: ', error.message);
      res.status(500).send('Error searching for book');
    }
  }
});

app.post('/edit/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);

  const { title, author, isbn, readStatus, date, rating, notes } = req.body;

  try {
    const userNoteResult = await client.query(
      `SELECT id
       FROM user_notes
       WHERE book_id = $1`,
      [bookId]
    );

    if (userNoteResult.rows.length === 0) {
      throw new Error('User note not found for the given book');
    }

    // Update the user note
    await client.query(
      `UPDATE user_notes
       SET status = $1, read_date = $2, rating = $3, note = $4
       WHERE book_id = $5`,
      [readStatus, date, rating, notes, bookId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error editing book');
  }
});

app.get('/delete/:id', async (req, res) => {
  const bookId = parseInt(req.params.id);

  try {
    const result = await db.query(
      `DELETE FROM book_notes
            WHERE id = $1`,
      [bookId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error deleting book');
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, callback) => {
      try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2)',
            [profile.email, 'google']
          );
          callback(null, profile);
        } else {
          callback(null, profile);
        }
      } catch (err) {
        callback(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
