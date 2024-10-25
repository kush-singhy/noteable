import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import https from 'https';
import 'dotenv/config';

const app = express();
const port = 3000;
const agent = new https.Agent({  
    rejectUnauthorized: false
});

const apiKey = process.env.API_KEY;

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const coverCache = new Map();

// VARIABLES

var books = [];

var input = '';
var searchResults = [];


// UTILITY FUNCTIONS

function formatPostgresDate(pgDate) {
    const date = new Date(pgDate);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
} 


async function fetchBookCover(book) {
    if (coverCache.has(book.isbn)) {
        book.cover = coverCache.get(book.isbn);
    } else {
        try {
            const response = await axios.get('https://bookcover.longitood.com/bookcover/' + book.isbn);
            const coverUrl = response.data.url;
            coverCache.set(book.isbn, coverUrl);
            book.cover = coverUrl;
        } catch (error) {
            console.error(`Error fetching cover for ISBN ${book.isbn}:`, error.message);
            book.cover = '/assets/gradient.jpg'; 
        }
    }
    return book;
}

async function fetchBooks() {
    try {
        const result = await db.query(
            `SELECT *
            FROM book_notes
            ORDER BY read_date DESC`
        );
        books = result.rows;
        await Promise.all(books.map(fetchBookCover));

    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Error fetching books');
    }
}


// ROUTING

app.get("/", async (req, res) => {
    const sort = 'date';

    if (books.length === 0) {
        console.log('Fetching books...');
        await fetchBooks();
    } 
    
    const filteredBooks = books.filter((book) => book.status === true);

    res.render("index.ejs", { 
        books: filteredBooks, 
        sort, 
        notes: true,
        formatPostgresDate 
    });
});


app.get("/wishlist", async (req, res) => {
    if (books.length === 0) {
        console.log('Fetching books...');
        await fetchBooks();
    }

    const filteredBooks = books.filter((book) => book.status === false);
    res.render("index.ejs", { 
        books: filteredBooks, 
        formatPostgresDate 
    });
});

app.get("/latest", async (req, res) => {
    const sort = 'date';

    if (books.length === 0) {
        console.log('Fetching books...');
        await fetchBooks();
    } 
    
    const filteredBooks = books.filter((book) => book.status === true);
    filteredBooks.sort((a, b) => new Date(b.read_date) - new Date(a.read_date));

    res.render("index.ejs", { 
        books: filteredBooks, 
        sort, 
        notes: true,
        formatPostgresDate 
    });
});

app.get("/highest-rating", async (req, res) => {
    const sort = 'rating';

    if (books.length === 0) {
        console.log('Fetching books...');
        await fetchBooks();
    } 
    
    const filteredBooks = books.filter((book) => book.status === true);
    filteredBooks.sort((a, b) => b.rating - a.rating);

    res.render("index.ejs", { 
        books: filteredBooks, 
        sort, 
        notes: true,
        formatPostgresDate 
    });
});

app.get("/title", async (req, res) => {
    const sort = 'title';

    if (books.length === 0) {
        console.log('Fetching books...');
        await fetchBooks();
    } 
    
    const filteredBooks = books.filter((book) => book.status === true);
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));

    res.render("index.ejs", { 
        books: filteredBooks, 
        sort, 
        notes: true,
        formatPostgresDate 
    });
});


app.get("/view-notes/:id", async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const result = await db.query(
            `SELECT *
            FROM book_notes
            WHERE id = $1`,
            [bookId]
        );
        let book = result.rows[0];
        book = await fetchBookCover(book);
        res.render("booknotes.ejs", { book, formatPostgresDate });
    } catch (error) {
        console.error("Error: ", error.message);
        res.redirect("/");
    }
    
});


app.post("/add/search", async (req, res) => {
    input = req.body.book_name;
    if (input === '') {
        searchResults = [];
        res.redirect("/add");
    } else {
        console.log('User Input: ' + input);
        const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${input}&key=${apiKey}&maxResults=8`;
        try {
            const response = await axios.get(searchURL);
            const results = response.data.items;
            const filteredResults = results.map((result) => {
                const title = result.volumeInfo.title || 'NA';
    
                const authorList = result.volumeInfo.authors || null;
                const author = (authorList && authorList.length > 0) ? authorList[0] : 'NA';
    
                const industryIdentifiers = result.volumeInfo.industryIdentifiers || null;
                const isbn13 = (industryIdentifiers) ? industryIdentifiers.find((identifier) => identifier.type === 'ISBN_13') : null;
                const isbn = (isbn13) ? isbn13.identifier : 'NA';

                return {title, author, isbn};
            });
            searchResults = filteredResults;
            res.redirect("/add");
        } catch(error) {
            console.error('Error searching: ', error.message);
            res.redirect("/add");
        }
    }
});

app.get("/add", (req, res) => {
    res.render("addbook.ejs", { input, results: searchResults });
    input = '';
    searchResults = [];
});

app.post("/add", async (req, res) => {
    const { title, author, isbn, date, rating, notes } = req.body;
    const status = req.body['read-status'];

    try {
        if (status === 'yes') {
            const result = await db.query(
                `INSERT INTO book_notes (title, author, isbn, status, read_date, rating, notes)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id`,
                [title, author, isbn, true, date, rating, notes]
            )
            const bookId = result.rows[0].id;
            await fetchBooks();
            res.redirect("/view-notes/" + bookId);
        } else if (status === 'no') {
            const result = await db.query(
                `INSERT INTO book_notes (title, author, isbn, status)
                VALUES ($1, $2, $3, $4)
                RETURNING id`,
                [title, author, isbn, false]
            )
            const bookId = result.rows[0].id;
            await fetchBooks();
            res.redirect("/view-notes/" + bookId);
        }
    } catch (error) {
        console.error(error.message);
        res.redirect("/add");
    }

});

app.get("/edit/:id", async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const result = await db.query(
            `SELECT *
            FROM book_notes
            WHERE id = $1`,
            [bookId]
        );
        const book = result.rows[0];
        res.render("editbook.ejs", { book, formatPostgresDate });

    } catch (error) {
        console.error(error.message);
        res.redirect("/");
    }
});

app.post("/edit/:id", async (req, res) => {
    const bookId = parseInt(req.params.id);

    const { title, author, isbn, date, rating, notes } = req.body;
    const status = req.body['read-status'];

    try {
        if (status === 'yes') {
            const result = await db.query(
                `UPDATE book_notes
                SET title = $1, author = $2, isbn = $3, status = $4, read_date = $5, rating = $6, notes = $7
                WHERE id = $8`,
                [title, author, isbn, true, date, rating, notes, bookId]
            )
            await fetchBooks();
            res.redirect("/view-notes/" + bookId);
        } else if (status === 'no') {
            const result = await db.query(
                `UPDATE book_notes
                SET title = $1, author = $2, isbn = $3, status = $4, read_date = $5, rating = $6, notes = $7
                WHERE id = $8`,
                [title, author, isbn, false, null, null, null, bookId]
            )
            await fetchBooks();
            res.redirect("/view-notes/" + bookId);
        }
    } catch (error) {
        console.error(error.message);
        res.redirect("/edit/" + bookId);
    }
});

app.get("/delete/:id", async (req, res) => {
    const bookId = parseInt(req.params.id);

    try {
        const result = await db.query(
            `DELETE FROM book_notes
            WHERE id = $1`,
            [bookId]
        )
        await fetchBooks();
        res.redirect("/");
    } catch (error) {
        console.error(error.message);
        res.redirect("/view-notes/" + bookId);
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});

