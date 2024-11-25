import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

import Input from './ui/Input';
import Toggle from './ui/Toggle';
import RatingSelect from './ui/RatingSelect';
import NotesInput from './NotesInput';

function EditBookForm(props) {
  const navigate = useNavigate();
  const { book } = props;

  let date = new Date(book.read_date);
  const day = date.getDate() + 1;
  date.setDate(day);
  const formattedDate = date.toISOString();

  const [newBook, setNewBook] = useState({
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    readStatus: book.status,
    date: book.status ? formattedDate : null,
    rating: book.status ? book.rating : '',
    notes: book.status ? book.note : '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewBook((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleNotes = (value) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setNewBook((prevValue) => {
      return {
        ...prevValue,
        notes: sanitizedValue,
      };
    });
  };

  const handleStatus = (status) => {
    setNewBook((prevValue) => {
      return {
        ...prevValue,
        readStatus: status,
      };
    });
  };

  async function handleSubmit() {
    try {
      const response = await axios.post(`/edit/${book.id}`, newBook);
      navigate('/');
    } catch (err) {
      console.error('Error adding book:', err);
    }
  }

  return (
    <div className="container small-container">
      <div className="add-form">
        <div className="add-info">
          <Input
            id="title"
            type="text"
            value={newBook.title}
            onChange={handleChange}
            label="Title"
          />
          <Input
            id="author"
            type="text"
            value={newBook.author}
            onChange={handleChange}
            label="Author"
          />
          <Input
            id="isbn"
            type="text"
            value={newBook.isbn}
            onChange={handleChange}
            label="ISBN"
          />
          <Toggle
            status={newBook.readStatus}
            setStatus={handleStatus}
            leftText="Have Read"
            rightText="Want to Read"
          />
        </div>

        <div
          className={newBook.readStatus === 'Completed' ? `` : `hide-inputs`}
        >
          <h5>Add your thoughts: </h5>
          <Input
            id="date"
            type="date"
            value={newBook.date ? newBook.date.split('T')[0] : ''}
            onChange={handleChange}
            label="Date Read"
          />
          <RatingSelect
            id="rating"
            value={newBook.rating}
            onChange={handleChange}
            label="Rating"
          />
          <NotesInput value={newBook.notes} onChange={handleNotes} />
        </div>
        <div className="edit-btn-box">
          <button onClick={handleSubmit} className="save-btn edit-page-btn">
            Save Changes
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="cancel-btn edit-page-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBookForm;
