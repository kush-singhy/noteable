import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import formatDate from '../util/formatDate';
import Header from '../components/ui/Header';
import DOMPurify from 'dompurify';

import defaultCover from '../assets/not-found-alt.svg';
import calendarIcon from '../assets/Calendar.svg';
import starIcon from '../assets/Star.svg';
import NotesInput from '../components/NotesInput';
import StatusBadge from '../components/ui/StatusBadge';
import MenuDots from '../components/ui/MenuDots';

function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { editingStatus } = location.state || {};

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(editingStatus);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/book/${id}`, {
          withCredentials: true,
        });
        const bookData = response.data;

        setBook(bookData);
      } catch (err) {
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const date = formatDate(book.read_date);

  const handleChange = (value) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setBook((prevValue) => {
      return {
        ...prevValue,
        note: sanitizedValue,
      };
    });
  };

  const handleSaveChanges = async () => {
    setEditing(false);
    try {
      await axios.post(`/api/edit/${book.id}`, book, {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Error saving changes:', err);
    }
  };

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleEdit = () => {
    navigate(`/edit/${book.id}`, {
      state: book,
    });
  };
  const handleDelete = async () => {
    try {
      await axios.get(`/api/delete/${book.id}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <Header
        button={
          <button
            onClick={isEditing ? handleSaveChanges : handleStartEditing}
            className="save-changes-btn"
          >
            {isEditing ? 'Save Changes' : 'Edit Notes'}
          </button>
        }
      />
      <div className="container book-display">
        <div className="book-header">
          {/* Book specific info */}
          <div className="book-info">
            <img
              src={book.cover ? book.cover : defaultCover}
              className="book-img"
              alt="Book Cover"
            />
            <div className="book-text-info">
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <StatusBadge status={book.status} />
            </div>

            {book.status === 'To Read' && (
              <div className="book-menu">
                <MenuDots handleEdit={handleEdit} handleDelete={handleDelete} />
              </div>
            )}
          </div>

          {/* User input details */}
          {book.status === 'Completed' && (
            <div className="book-details">
              <div className="book-date">
                <img src={calendarIcon} />
                <span>{date}</span>
              </div>
              <div className="book-rating">
                <img src={starIcon} />
                <span>{book.rating}/5</span>
              </div>
              <div className="book-menu">
                <MenuDots handleEdit={handleEdit} handleDelete={handleDelete} />
              </div>
            </div>
          )}
        </div>

        {/* User input notes */}
        <NotesInput
          value={book.note}
          onChange={handleChange}
          focus={true}
          editing={isEditing}
        />
      </div>
    </div>
  );
}

export default BookEditPage;
