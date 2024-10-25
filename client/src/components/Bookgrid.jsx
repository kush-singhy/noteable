import React, { useState } from "react";
import Bookcard from "./Bookcard";
import bookNotes from "../mock-data";
import defaultCover from "../assets/gradient.jpg"


function Bookgrid() {
    const [readStatus, setReadStatus] = useState(true);
    const [sortType,setSortType] = useState('date');

    function createCard(book) {
        return (
            <Bookcard 
                key={book.id}
                title={book.title}
                author={book.author}
                coverUrl={defaultCover}
                status={book.status}
                read_date={book.read_date}
                rating={book.rating}
            />
        );
    }

    const filteredBooks = bookNotes.filter((book) => {
        return book.status === readStatus;
    });

    if (sortType === 'date') {
        filteredBooks.sort((a, b) => new Date(b.read_date) - new Date(a.read_date));
    } else if (sortType === 'rating') {
        filteredBooks.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'title') {
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    }

    return (
        <div className="container">
            <div className="filters">
                <div className="toggle">
                    <button onClick={() => {setReadStatus(true)}}>Notes</button>
                    <button onClick={() => {setReadStatus(false)}}>Wishlist</button>
                </div>

                <div className="input-group sort-select">
                    <label className="input-group-text" htmlFor="sort-select">Sort by:</label>
                    <select 
                        className="form-select" 
                        id="sort-select" 
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="date">Date Read</option>
                        <option value="rating">Rating</option>
                        <option value="title">Title</option>
                    </select>
                </div>


            </div>

            <div className="book-grid">
                {filteredBooks.map(createCard)}
            </div>

        </div>
    )
}   

export default Bookgrid;