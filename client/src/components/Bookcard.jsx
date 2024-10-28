import React from "react";
import StatusBadge from "./StatusBadge";
import formatDate from "../util/formatDate";

function Bookcard(props) {

    const { title, author, coverUrl, status, read_date, rating } = props;

    const date = formatDate(read_date);

    return (
        <div className="book-card">
            <div className="row g-0">
                <div className="col-4 col-md-4">
                    <img src={coverUrl} className="cover-img" alt="Book Cover" />
                </div>
                <div className="col-8 col-md-8">
                <div className="book-card-body">
                    <h5 className="book-card-title">{title}</h5>
                    <p className="book-card-subtitle">{author}</p>
                    <StatusBadge status={status} />
                    {status && <p className="book-card-text">{date}</p>}
                    {status && <p className="book-card-text">{rating}/5</p>}
                </div>
                </div>
            </div>
        </div>
    );
}

export default Bookcard;