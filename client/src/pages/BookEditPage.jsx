import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/book/${id}`, {
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

  const handleEdit = () => {
    navigate(`/edit/${book.id}`, {
      state: book,
    });
  };
  const handleDelete = async () => {
    try {
      await axios.get(`/delete/${book.id}`);
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
            <div className="book-menu" data-bs-toggle="dropdown">
              <img src={dotsIcon} />
            </div>
            <ul className="profile-dropdown dropdown-menu">
              <li>
                <button
                  onClick={handleEdit}
                  className="logout-btn dropdown-item"
                >
                  Edit Details
                </button>
              </li>
              <li>
                <button
                  className="logout-btn dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  Delete Book
                </button>
              </li>
            </ul>
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

      <div className="modal fade" id="deleteModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Hold your horses!
              </h1>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this entry?
            </div>
            <div className="modal-footer">
              <button
                onClick={handleDelete}
                className="modal-btn delete-btn"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
              <button
                type="button"
                className="modal-btn cancel-btn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookEditPage;
