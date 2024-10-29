import React, { useState } from "react";
import searchIcon from '../assets/search.svg'

function AddBookForm() {
    const [readStatus, setReadStatus] = useState(true);


    return (
        <div class="container small-container">
            <div class="add-search">
                <div class="search-bar input-group">
                    <input type="text" class="form-control" placeholder="Search for a title..." />
                    <button class="search-btn">
                        <img src={searchIcon} class="search-icon" alt="Search"/>
                    </button>
                </div>
            </div>


            <div class="add-form">
                <h5>Or enter details here: </h5>
                <div class="add-info">
                    <div class="input-group mb-3">
                        <input type="text" name="title" class="form-control" placeholder="Title..." />
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" name="author" class="form-control" placeholder="Author..." />
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" name="isbn" class="form-control" placeholder="ISBN..." />
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
                    <div class="input-group mb-3">
                        <input type="date" name="date" class="form-control" placeholder="Date..." />
                    </div>
                    <div class="input-group mb-3">
                        <select class="form-select" id="inputGroupSelect01" name="rating">
                          <option selected>Rating...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    <div class="input-group mb-3">
                        <textarea name="notes" class="form-control notes-input" placeholder="Notes..."></textarea>
                    </div>
                </div>
                <button class="add-book-btn">Add</button>
            </div>

          
    </div>
    )
}

export default AddBookForm;