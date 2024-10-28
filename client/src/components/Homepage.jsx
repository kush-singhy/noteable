import React, { useState } from "react";
import bookNotes from "../mock-data";
import Bookgrid from "./Bookgrid";


function Homepage() {
    const [readStatus, setReadStatus] = useState(true);
    const [sortType,setSortType] = useState('date');

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
                    <div 
                        className={`slider ${readStatus ? 'left' : 'right'}`}
                    ></div>
                    <button 
                        className={readStatus ? 'active' : ''} 
                        onClick={() => setReadStatus(true)}
                    >
                        Notes
                    </button>
                    <button 
                        className={!readStatus ? 'active' : ''} 
                        onClick={() => setReadStatus(false)}
                    >
                        Wishlist
                    </button>
                </div>

                <div className={`input-group sort-select ${readStatus ? '' : 'hide-select'}`}>
                    <label className="input-group-text sort-label" htmlFor="sort-select">Sort by:</label>
                    <select 
                        className="form-select sort-input" 
                        id="sort-select" 
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="date">Date Read</option>
                        <option value="rating">Rating</option>
                        <option value="title">Title</option>
                    </select>
                </div>

            </div>

            <Bookgrid 
                books={filteredBooks}
                readStatus={readStatus}
                sortType={sortType} 
            />

        </div>
    )
}   

export default Homepage;