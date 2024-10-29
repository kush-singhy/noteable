import React, { useEffect, useState } from "react";
import searchIcon from '../assets/search.svg'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddBookForm() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('Deep Work');
    const [author, setAuthor] = useState('Cal Newport');
    const [isbn, setISBN] = useState('9780349411903');
    const [readStatus, setReadStatus] = useState(true);

    const [date, setDate] = useState('');
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState('');

    const handleTitle = (e) => setTitle(e.target.value)
    const handleAuthor = (e) => setAuthor(e.target.value)
    const handleISBN = (e) => setISBN(e.target.value)
    const handleDate = (e) => setDate(e.target.value)
    const handleRating = (e) => setRating(e.target.value)
    const handleNotes = (e) => setNotes(e.target.value)

    async function handleSubmit() {
        const data = {
            title: title, 
            author: author, 
            isbn: isbn, 
            readStatus: readStatus, 
            date: date, 
            rating: rating, 
            notes: notes
        }


        try {
            console.log("Try block");
            const response = await axios.post('http://localhost:3000/book', data);
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
                    <div className="input-group mb-3">
                        <input type="text" name="title" className="form-control" placeholder="Title..." value={title} onChange={handleTitle} autoComplete="off"/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="author" className="form-control" placeholder="Author..." value={author} onChange={handleAuthor} autoComplete="off"/>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" name="isbn" className="form-control" placeholder="ISBN..." value={isbn} onChange={handleISBN} autoComplete="off"/>
                    </div>
                    <div className="toggle mb-4">
                        <div 
                            className={`slider ${readStatus ? 'left' : 'right'}`}
                        ></div>
                        <button 
                            className={readStatus ? 'active' : ''} 
                            onClick={() => setReadStatus(true)}
                        >
                            Have Read
                        </button>
                        <button 
                            className={!readStatus ? 'active' : ''} 
                            onClick={() => setReadStatus(false)}
                        >
                            Want to Read
                        </button>
                    </div>
                </div>

                <div className={readStatus ? `` : `hide-inputs`}>
                    <h5>Add your thoughts: </h5>
                    <div className="input-group mb-3">
                        <input type="date" name="date" className="form-control" placeholder="Date..." onChange={handleDate}/>
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupSelect01" name="rating" defaultValue={"rating"} onChange={handleRating}>
                          <option value="rating">Rating...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    <div className="input-group mb-3">
                        <textarea name="notes" className="form-control notes-input" placeholder="Notes..." onChange={handleNotes} value={notes}></textarea>
                    </div>
                </div>
                <button onClick={handleSubmit} className="add-book-btn">Add</button>
            </div>

          
    </div>
    )
}

export default AddBookForm;