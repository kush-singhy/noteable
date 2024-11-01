import React, { useEffect, useState } from "react";
import searchIcon from '../assets/search.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddBookForm() {
    const navigate = useNavigate();

    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        isbn: "",
        readStatus: true,
        date: null,
        rating: 0,
        notes: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNewBook(prevValue => {
            return {
                ...prevValue,
                [name] : value
            }
        });
    }

    const handleStatus = (event) => {
        const status = event.target.value === 'yes' ? true : false;

        setNewBook(prevValue => {
            return {
                ...prevValue,
                readStatus: status
            }
        })
    }

    async function handleSubmit() {

        try {
            const response = await axios.post('http://localhost:3000/book', newBook);
            console.log(response);
            navigate('/');
        } catch (err) {
            console.error('Error adding book:', err);
        }
    }



    return (
        <div className="container small-container">
            <div className="add-search">
                <div className="search-bar input-group">
                    <input type="text" className="form-control" placeholder="Search for a title..." />
                    <button className="search-btn">
                        <img src={searchIcon} className="search-icon" alt="Search"/>
                    </button>
                </div>
            </div>


            <div className="add-form">
                <h5>Or enter details here: </h5>
                <div className="add-info">
                    <div className="form-floating mb-3">
                        <input 
                            id="title"
                            type="text" 
                            name="title" 
                            className="form-control" 
                            placeholder="Title..." 
                            value={newBook.title} 
                            onChange={handleChange} 
                            autoComplete="off"
                        />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="author" type="text" name="author" className="form-control" placeholder="Author..." value={newBook.author} onChange={handleChange} autoComplete="off" />
                        <label htmlFor="author">Author</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input id="isbn" type="text" name="isbn" className="form-control" placeholder="ISBN..." value={newBook.isbn} onChange={handleChange} autoComplete="off" />
                        <label htmlFor="isbn">ISBN</label>
                    </div>
                    <div className="toggle mb-4">
                        <div 
                            className={`slider ${newBook.readStatus ? 'left' : 'right'}`}
                        ></div>
                        <button
                            value='yes'
                            className={newBook.readStatus ? 'active' : ''} 
                            onClick={handleStatus}
                        >
                            Have Read
                        </button>
                        <button 
                            value='no'
                            className={!newBook.readStatus ? 'active' : ''} 
                            onClick={handleStatus}
                        >
                            Want to Read
                        </button>
                    </div>
                </div>

                <div className={newBook.readStatus ? `` : `hide-inputs`}>
                    <h5>Add your thoughts: </h5>
                    <div className="form-floating mb-3">
                        <input id="date" type="date" name="date" className="form-control" placeholder="Date..." onChange={handleChange} />
                        <label htmlFor="date">Date Read</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select id="rating" className="form-select" name="rating" defaultValue="" onChange={handleChange} >
                          <option value="" disabled>Rating...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <label htmlFor="rating">Rating</label>
                      </div>
                    <div className="form-floating mb-3">
                        <textarea id="notes" name="notes" className="form-control notes-input" placeholder="Notes..." onChange={handleChange} value={newBook.notes}></textarea>
                        <label htmlFor="notes">Notes</label>
                    </div>
                </div>
                <button onClick={handleSubmit} className="add-book-btn">Add</button>
            </div>

          
    </div>
    )
}

export default AddBookForm;