import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import DOMPurify from 'dompurify';

import SearchBar from '../components/SearchBar';
import Input from '../components/ui/Input';
import RatingSelect from '../components/ui/RatingSelect';
import Toggle from '../components/ui/Toggle';
import Header from '../components/ui/Header';

function AddBookPage() {
  const navigate = useNavigate();
  const today = new Date();

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    status: 'Completed',
    read_date: today.toISOString(),
    rating: '1',
    note: '',
  });
  const [errors, setErrors] = useState({});

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

  const handleStatus = (status) => {
    setNewBook((prevValue) => {
      return {
        ...prevValue,
        status: status,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newBook.title) newErrors.title = 'Title is required';
    if (!newBook.author) newErrors.author = 'Author is required';
    if (!newBook.isbn) newErrors.isbn = 'ISBN is required';
    return newErrors;
  };

  async function handleSubmit() {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post('/api/book', newBook, {
        withCredentials: true,
      });
      const noteId = response.data.id;
      navigate(`/book/${noteId}`, { state: { editingStatus: true } });
    } catch (err) {
      console.error('Error adding book:', err);
    }
  }

  return (
    <div className="page">
      <Header />
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
              error={errors.title}
            />
            <div className="half-length">
              <Input
                id="author"
                type="text"
                value={newBook.author}
                onChange={handleChange}
                label="Author"
                error={errors.author}
              />
              <Input
                id="isbn"
                type="text"
                value={newBook.isbn}
                onChange={handleChange}
                label="ISBN"
                error={errors.isbn}
              />
            </div>
          </div>
          <div className="toggle-box">
            <Toggle
              status={newBook.status}
              setStatus={handleStatus}
              leftText="Have Read"
              rightText="To Read"
            />
          </div>

          <div className={newBook.status === 'Completed' ? '' : 'hide-inputs'}>
            <div className="half-length">
              <Input
                id="read_date"
                type="date"
                value={newBook.read_date ? newBook.read_date.split('T')[0] : ''}
                onChange={handleChange}
                label="Date Read"
              />
              <RatingSelect
                id="rating"
                value={newBook.rating}
                onChange={handleChange}
                label="Rating"
              />
            </div>
          </div>
          <div className="edit-btn-box">
            <button onClick={handleSubmit} className="save-btn edit-page-btn">
              Add
            </button>
            <button
              onClick={() => {
                navigate('/');
              }}
              className="cancel-btn edit-page-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBookPage;
