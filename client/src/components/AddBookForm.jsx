import React from "react";

function AddBookForm() {
    return (
        <div class="container small-container">
            <h2>Add Book</h2>
            <div class="add-search">
                <form>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for a book..." />
                        <button class="btn btn-outline-secondary" type="submit" id="search-btn">
                            Search
                        </button>
                    </div>
                </form>
                <div class="list-group search-results">
                    
                </div>
            </div>


            <div class="add-form">
                <h5>Or enter details here: </h5>
                <form>
                    <div class="add-info">
                        <div class="input-group mb-3">
                            <span class="add-form-label add-form-label input-group-text" id="basic-addon1">Title</span>
                            <input type="text" name="title" class="form-control" placeholder="Title..." required />
                        </div>
                        <div class="input-group mb-3">
                            <span class="add-form-label input-group-text" id="basic-addon1">Author</span>
                            <input type="text" name="author" class="form-control" placeholder="Author..." required />
                        </div>
                        <div class="input-group mb-3">
                            <span class="add-form-label input-group-text" id="basic-addon1">ISBN</span>
                            <input type="text" name="isbn" class="form-control" placeholder="ISBN..." required />
                        </div>
                        <div class="read-switch">
                            <input type="radio" class="btn-check" name="read-status" id="have-read" value="yes" autocomplete="off" onclick="toggleNotes()" />
                            <label class="btn" for="have-read">Have Read</label>

                            <input type="radio" class="btn-check" name="read-status" id="have-not-read" value="no" autocomplete="off" onclick="toggleNotes()" checked />
                            <label class="btn" for="have-not-read">Want to Read</label>
                        </div>
                    </div>

                <div id="add-notes">
                    <h5>Add your thoughts: </h5>
                    <div class="input-group mb-3">
                        <span class="add-form-label input-group-text" id="basic-addon1">Date</span>
                        <input type="date" name="date" class="form-control" placeholder="Date..." />
                    </div>
                    <div class="input-group mb-3">
                        <label class="add-form-label input-group-text" for="inputGroupSelect01">Rating</label>
                        <select class="form-select" id="inputGroupSelect01" name="rating">
                          <option selected>Choose...</option>
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
                <button type="submit" class="btn btn-success">Add</button>
            </form>
        </div>

          
    </div>
    )
}

export default AddBookForm;