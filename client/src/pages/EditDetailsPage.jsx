import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import Input from '../components/ui/Input';
import RatingSelect from '../components/ui/RatingSelect';
import Toggle from '../components/ui/Toggle';
import Header from '../components/ui/Header';

function EditDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookData = location.state || {};

  const [errors, setErrors] = useState({});

  let date = new Date(bookData.read_date);
  const day = date.getDate() + 1;
  date.setDate(day);
  const formattedDate = date.toISOString();

  const [book, setBook] = useState({ ...bookData, read_date: formattedDate });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBook((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleStatus = (status) => {
    setBook((prevValue) => {
      return {
        ...prevValue,
        status: status,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!book.title) newErrors.title = 'Title is required';
    if (!book.author) newErrors.author = 'Author is required';
    if (!book.isbn) newErrors.isbn = 'ISBN is required';
    return newErrors;
  };

  async function handleSubmit() {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log('Book: ', book);

    try {
      await axios.post(`/api/edit/${book.id}`, book, {
        withCredentials: true,
      });
      navigate(-1);
    } catch (err) {
      console.error('Error adding book:', err);
    }
  }

  return (
    <div className="page">
      <Header />
      <div className="container small-container">
        <div className="add-form">
          <div className="add-info">
            <Input
              id="title"
              type="text"
              value={book.title}
              onChange={handleChange}
              label="Title"
              error={errors.title}
            />
            <div className="half-length">
              <Input
                id="author"
                type="text"
                value={book.author}
                onChange={handleChange}
                label="Author"
                error={errors.author}
              />
              <Input
                id="isbn"
                type="text"
                value={book.isbn}
                onChange={handleChange}
                label="ISBN"
                error={errors.isbn}
              />
            </div>
          </div>
          <div className="toggle-box">
            <Toggle
              status={book.status}
              setStatus={handleStatus}
              leftText="Have Read"
              rightText="To Read"
            />
          </div>

          <div className={book.status === 'Completed' ? '' : 'hide-inputs'}>
            <div className="half-length">
              <Input
                id="read_date"
                type="date"
                value={book.read_date ? book.read_date.split('T')[0] : ''}
                onChange={handleChange}
                label="Date Read"
              />
              <RatingSelect
                id="rating"
                value={book.rating}
                onChange={handleChange}
                label="Rating"
              />
            </div>
          </div>
          <div className="edit-btn-box">
            <button onClick={handleSubmit} className="save-btn edit-page-btn">
              Save
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
    </div>
  );
}

export default EditDetailsPage;
