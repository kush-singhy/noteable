import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import formatDate from '../util/formatDate';

function Bookcard(props) {
  const navigate = useNavigate();

  const { book } = props;

  const date = formatDate(book.read_date);

  const handleClick = () => {
    navigate(`/book/${book.id}`, {
        state: book
    });
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <div className="row g-0">
        <div className="col-4 col-md-4">
          <img src={book.cover} className="cover-img" alt="Book Cover" />
        </div>
        <div className="col-8 col-md-8">
          <div className="book-card-body">
            <h5 className="book-card-title">{book.title}</h5>
            <p className="book-card-subtitle">{book.author}</p>
            <StatusBadge status={book.status} />
            {book.status && <p className="book-card-text">{date}</p>}
            {book.status && <p className="book-card-text">{book.rating}/5</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookcard;
