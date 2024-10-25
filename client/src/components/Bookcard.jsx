import React from "react";

function Bookcard(props) {
    
    return (
        <a href="" className="book-card-link">
            <div className="book-card">
                <div className="row g-0">
                    <div className="col-4 col-md-4">
                        <img src={props.coverUrl} className="cover-img" alt="Book Cover" />
                    </div>
                    <div className="col-8 col-md-8">
                    <div className="book-card-body">
                        <h5 className="book-card-title">{props.title}</h5>
                        <p className="book-card-subtitle">{props.author}</p>
                        <span className="badge rounded-pill read-badge">Read</span>
                        <span className="badge rounded-pill to-read-badge">To Read</span>
                        <p className="book-card-text">{props.read_date}</p>
                        <p className="book-card-text">{props.rating}</p>
                    </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default Bookcard;