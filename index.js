import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import axios from 'axios';
import https from 'https';
import 'dotenv/config';
import GoogleStrategy from 'passport-google-oauth2';
import authRoute from './routes/auth.js';
import pool from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// CONST DEFINITIONS
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const app = express();
const apiKey = process.env.API_KEY;
const coverCache = new Map();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// MIDDLEWARE
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
    origin: CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use('/auth', authRoute);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
}

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
    const result = await pool.query(
      `SELECT 
	  		bn.id,
	  		bn.title,
	  		bn.author,
	  		bn.isbn,
	  		bn.status,
	  		bn.read_date,
	  		bn.rating,
	  		bn.note
  		FROM book_notes bn
  		INNER JOIN users u ON bn.user_id = u.id
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
    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [userEmail]
    );
    const userId = userResult.rows[0].id;

    await pool.query(
      `INSERT INTO book_notes (user_id, title, author, isbn, status, read_date, rating, note)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId,
        title,
        author,
        isbn,
        readStatus,
        date || null,
        rating || null,
        notes || null,
      ]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error adding book');
  }
});

app.post('/edit/:id', async (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, author, isbn, readStatus, date, rating, notes } = req.body;

  try {
    await pool.query(
      `UPDATE book_notes
       SET title = $1, author = $2, isbn = $3, status = $4, read_date = $5, rating = $6, note = $7
       WHERE id = $8`,
      [title, author, isbn, readStatus, date, rating, notes, noteId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error editing book');
  }
});

app.get('/delete/:id', async (req, res) => {
  const noteId = parseInt(req.params.id);

  try {
    await pool.query(
      `DELETE FROM book_notes
            WHERE id = $1`,
      [noteId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error deleting book');
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

const callbackURL = process.env.CALLBACK_URL || '/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, callback) => {
      try {
        const result = await pool.query(
          'SELECT * FROM users WHERE email = $1',
          [profile.email]
        );
        if (result.rows.length === 0) {
          const newUser = pool.query(
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
