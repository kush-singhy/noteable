import React from "react";

function BookView() {
    return (

        <div class="container small-container">
            <div class="notes-header">
                <img src="" class="notes-img" alt="Book Cover" />
                <span>
                    <h1>Title</h1>
                    <h5>By Author</h5>
                        <span class="badge rounded-pill read-badge">Read</span>
                        <span class="badge rounded-pill to-read-badge">To Read</span>
                </span>
                <div class="notes-buttons">
                    <a href="" class="icon-btn edit-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                    </a>
                    <button type="button" class="icon-btn delete-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                          </svg>
                    </button>
                </div>
            </div>
                    
            <div class="notes-info">
                    
                    <p class="book-card-text">Read: </p>
                    <p class="book-card-text">Rating: </p>
            </div>
                
            <div class="notes-body">
                    <h3>My Notes</h3>
                    <p class="book-card-text">Notes</p>
            </div>
                
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Hold your horses!</h1>
                    </div>
                    <div class="modal-body">
                      Are you sure you want to delete this entry?
                    </div>
                    <div class="modal-footer">
                        <a href="/delete/<%= book.id %>" class="modal-btn delete-btn">Delete</a>
                        <button type="button" class="modal-btn cancel-btn" data-bs-dismiss="modal">Cancel</button>
                    </div>
                  </div>
                </div>
            </div>
        </div>


    )
}

export default BookView;