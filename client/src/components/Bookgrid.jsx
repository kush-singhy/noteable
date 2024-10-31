import React, { useState } from 'react';
import Bookcard from './Bookcard';

function Bookgrid(props) {
  const { books, readStatus, sortType } = props;

  function createCard(book) {
    return (
      <Bookcard
        key={book.id}
        book={book}
      />
    );
  }

  const filteredBooks = books.filter((book) => {
    return book.status === readStatus;
  });

  if (sortType === 'date') {
    filteredBooks.sort((a, b) => new Date(b.read_date) - new Date(a.read_date));
  } else if (sortType === 'rating') {
    filteredBooks.sort((a, b) => b.rating - a.rating);
  } else if (sortType === 'title') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  }

  return <div className="book-grid">{filteredBooks.map(createCard)}</div>;
}

export default Bookgrid;
