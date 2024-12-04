import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import formatDate from '../util/formatDate';
import Header from '../components/ui/Header';
import DOMPurify from 'dompurify';

import calendarIcon from '../assets/Calendar.svg';
import starIcon from '../assets/Star.svg';
import dotsIcon from '../assets/dots.svg';
import NotesInput from '../components/NotesInput';
import StatusBadge from '../components/ui/StatusBadge';

function BookEditPage() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/book/${id}`, {
          withCredentials: true,
        });
        const book = response.data;
        setBook(book);
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

  const handleMenu = () => {
    console.log('Menu clicked');
  };

  const handleSaveChanges = async () => {
    setEditing(false);
    try {
      await axios.post(`/edit/${book.id}`, book, {
        withCredentials: true,
      });
    } catch (err) {
      console.error('Error saving changes:', err);
    }
  };

  const handleStartEditing = () => {
    setEditing(true);
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
            <img src={book.cover} className="book-img" alt="Book Cover" />
            <div className="book-text-info">
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <StatusBadge status={book.status} />
            </div>
          </div>

          {/* User input details */}
          <div className="book-details">
            <div className="book-date">
              <img src={calendarIcon} />
              <span>{date}</span>
            </div>
            <div className="book-rating">
              <img src={starIcon} />
              <span>{book.rating}/5</span>
            </div>
            <div className="book-menu" onClick={handleMenu}>
              <img src={dotsIcon} />
            </div>
          </div>
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
