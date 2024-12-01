import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

import SearchBar from './SearchBar';
import Input from './ui/Input';
import RatingSelect from './ui/RatingSelect';
import NotesInput from './NotesInput';
import Toggle from './ui/Toggle';

function AddBookForm() {
  const navigate = useNavigate();

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    readStatus: 'Completed',
    date: null,
    rating: '',
    notes: '',
  });

  const handleBookSearch = (value) => {
    setNewBook((prevValue) => {
      return {
        ...prevValue,
        title: value.title,
        author: value.author,
        isbn: value.isbn,
      };
    });
  };

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
      await axios.post('/book', newBook, {
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      console.error('Error adding book:', err);
    }
  }

  return (
    <div className="container small-container">
      <SearchBar onResultChange={handleBookSearch} />

      <div className="add-form">
        <h5>Or enter details here: </h5>
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
            leftText="Read"
            rightText="To Read"
          />
        </div>

        <div
          className={newBook.readStatus === 'Completed' ? '' : 'hide-inputs'}
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
            Add
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

export default AddBookForm;
